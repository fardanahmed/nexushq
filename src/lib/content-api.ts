import type { Certification, ResearchArea } from '@/types';

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

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`Backend request failed or timed out: ${path}`, error);
    return fallback;
  }
}

export async function getSiteSettings<T = unknown>(
  key: string
): Promise<T | null> {
  const result = await fetchFromBackend<{ value: T | null }>(
    `/api/settings/${encodeURIComponent(key)}`,
    { value: null }
  );

  return result.value;
}

export async function getResearchAreas(): Promise<ResearchArea[]> {
  const result = await fetchFromBackend<{ items: ResearchArea[] }>(
    '/api/research-areas',
    { 
      items: [
        { id: '1', title: 'Sustainable Energy', description: 'Advanced research in solar, wind, and next-generation battery technologies.', icon: 'Zap', created_at: new Date().toISOString() },
        { id: '2', title: 'Health Systems', description: 'Data-driven approaches to optimizing healthcare delivery and patient outcomes.', icon: 'Activity', created_at: new Date().toISOString() },
        { id: '3', title: 'AgriTech', description: 'Sustainable agriculture solutions using IoT, drones, and machine learning.', icon: 'Sprout', created_at: new Date().toISOString() },
        { id: '4', title: 'AI & Computation', description: 'Foundational research in artificial intelligence and high-performance computing.', icon: 'Cpu', created_at: new Date().toISOString() },
      ]
    }
  );

  return result.items;
}

export async function getCertifications(): Promise<Certification[]> {
  const result = await fetchFromBackend<{ items: Certification[] }>(
    '/api/certifications',
    { items: [] }
  );

  return result.items;
}
