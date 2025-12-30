import { dataClient } from './data/client';
import type { ResearchArea, Certification } from '@/types';

/**
 * Fetch a site setting by key
 * @param key - The setting key to fetch
 * @returns The setting value or null if not found
 */
export async function getSiteSettings(key: string) {
  return dataClient.fetchSettings(key);
}

/**
 * Fetch all research areas, ordered by creation date
 * @returns Array of research areas
 */
export async function getResearchAreas(): Promise<ResearchArea[]> {
  return dataClient.fetchResearchAreas();
}

/**
 * Fetch all certifications, ordered by creation date
 * @returns Array of certifications
 */
export async function getCertifications(): Promise<Certification[]> {
  return dataClient.fetchCertifications();
}
