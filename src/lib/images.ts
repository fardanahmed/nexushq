/**
 * Image URL helper for Cloudflare R2 storage
 * Returns R2 URL in production, falls back to local /assets in development
 */

export function getImageUrl(filename: string): string {
  // Always use local assets to avoid external dependencies breaking
  return `/assets/${filename}`;
}

// Pre-defined image paths for type safety
export const images = {
  heroBackground: 'hero-background.webp',
  leadership: 'leadership.webp',
  mentorship: 'mentorship.webp',
  aboutUs: 'about-us.webp',
  institutionalPartners: 'institutional-partners.webp',
} as const;
