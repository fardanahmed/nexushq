/**
 * Image URL helper for Cloudflare R2 storage
 * Returns R2 URL in production, falls back to local /assets in development
 */

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

export function getImageUrl(filename: string): string {
  if (R2_PUBLIC_URL) {
    return `${R2_PUBLIC_URL}/assets/${filename}`;
  }
  // Fallback to local assets for development without R2
  return `/assets/${filename}`;
}

// Pre-defined image paths for type safety
export const images = {
  heroBackground: 'hero-background.webp',
  leadership: 'leadership.jpg',
  mentorship: 'mentorship.jpg',
  aboutUs: 'about-us.jpg',
  institutionalPartners: 'institutional-partners.jpg',
} as const;
