import type { Certification, Feature, ResearchArea } from '@/types';

// Simple in-memory cache to speed up dev mode and build compiles
const apiCache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 30000; // 30 seconds for successful requests
const FALLBACK_CACHE_TTL = 5000; // 5 seconds for failed requests

let isBackendOffline = false;
let lastOfflineCheck = 0;
const OFFLINE_COOLDOWN = 10000; // 10 seconds cooldown before trying again

function getBackendBaseUrl(): string | null {
  const rawUrl =
    import.meta.env.BACKEND_API_URL ||
    import.meta.env.PUBLIC_BACKEND_API_URL ||
    process.env.BACKEND_API_URL ||
    process.env.PUBLIC_BACKEND_API_URL;

  if (!rawUrl) {
    console.warn('BACKEND_API_URL or PUBLIC_BACKEND_API_URL is not configured.');
    return null;
  }

  return rawUrl.replace(/\/$/, '');
}

async function fetchFromBackend<T>(path: string, fallback: T): Promise<T> {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) {
    return fallback;
  }

  const now = Date.now();

  // Check cache first
  const cached = apiCache.get(path);
  if (cached && cached.expiry > now) {
    return cached.data as T;
  }

  // If we know the backend is offline, skip the fetch to prevent blocking timeouts
  if (isBackendOffline && now - lastOfflineCheck < OFFLINE_COOLDOWN) {
    return fallback;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Backend request failed: ${path} (${response.status})`);
      return fallback;
    }

    const data = (await response.json()) as T;
    
    // Cache successful response
    apiCache.set(path, { data, expiry: now + CACHE_TTL });
    isBackendOffline = false; // Reset offline status on success
    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    const isConnRefused = error?.cause?.code === 'ECONNREFUSED' || error?.code === 'ECONNREFUSED';
    const isFetchFailed = error?.message === 'fetch failed';

    if (isConnRefused || isFetchFailed) {
      isBackendOffline = true;
      lastOfflineCheck = now;
      console.warn(`[Content API] Backend offline at ${baseUrl}. Using mock fallback for ${path}`);
    } else {
      console.error(`Backend request failed or timed out: ${path}`, error);
    }

    // Cache fallback temporarily to prevent rapid duplicate logs
    apiCache.set(path, { data: fallback, expiry: now + FALLBACK_CACHE_TTL });
    return fallback;
  }
}

export async function getSiteSettings<T = unknown>(
  key: string
): Promise<T | null> {
  const defaultMentorship = {
    title: "Expert Coaching Tools",
    description: "Everything you need to run a professional coaching business.",
    benefits: [
      "Automated scheduling and booking management",
      "Client progress tracking and analytics",
      "Integrated video session hosting"
    ]
  };

  const fallbackValue = key === 'mentorship_content' ? defaultMentorship : null;

  const result = await fetchFromBackend<{ value: T | null }>(
    `/api/settings/${encodeURIComponent(key)}`,
    { value: fallbackValue as unknown as T }
  );

  return result.value;
}

export async function getFeatures(): Promise<Feature[]> {
  const result = await fetchFromBackend<{ items: Feature[] }>(
    '/api/features',
    { 
      items: [
        { id: '1', title: 'Smart Scheduling', description: 'Automated booking system with calendar sync, timezone detection, and buffer time management.', icon: 'Calendar', created_at: new Date().toISOString() },
        { id: '2', title: 'Client Management', description: 'Track client progress, session notes, and outcomes with a centralized roster.', icon: 'Users', created_at: new Date().toISOString() },
        { id: '3', title: 'Video Sessions', description: 'Host, record, and manage video coaching sessions with built-in screen sharing.', icon: 'Video', created_at: new Date().toISOString() },
        { id: '4', title: 'Payments & Invoicing', description: 'Accept payments, send invoices, and manage subscriptions — all in one dashboard.', icon: 'CreditCard', created_at: new Date().toISOString() },
      ]
    }
  );

  return result.items;
}

/** @deprecated Use getFeatures instead */
export async function getResearchAreas(): Promise<ResearchArea[]> {
  return getFeatures();
}

export async function getCertifications(): Promise<Certification[]> {
  const result = await fetchFromBackend<{ items: Certification[] }>(
    '/api/certifications',
    { 
      items: [
        { id: '1', title: 'Data Science for Healthcare', description: 'Apply data science to optimize healthcare delivery.', duration: '6 weeks', created_at: new Date().toISOString() },
        { id: '2', title: 'IoT for Agriculture', description: 'Build IoT devices for smart agriculture solutions.', duration: '4 weeks', created_at: new Date().toISOString() },
        { id: '3', title: 'AI & Computation', description: 'Advanced certification in artificial intelligence models.', duration: '8 weeks', created_at: new Date().toISOString() }
      ] 
    }
  );

  return result.items;
}
