/**
 * Image URL helper for application assets
 * Resolves to Cloudflare R2 CDN URL if PUBLIC_R2_PUBLIC_URL is configured,
 * otherwise defaults to local static assets in /assets/
 */

export function getImageUrl(filename: string): string {
  const r2BaseUrl = import.meta.env.PUBLIC_R2_PUBLIC_URL;
  if (r2BaseUrl && typeof r2BaseUrl === 'string' && r2BaseUrl.trim() !== '') {
    const cleanBase = r2BaseUrl.replace(/\/+$/, '');
    const cleanFile = filename.replace(/^\/+/, '');
    return `${cleanBase}/${cleanFile}`;
  }
  return `/assets/${filename}`;
}

// Pre-defined image paths for type safety
export const images = {
  heroBackground: 'hero-background.webp',
  leadership: 'leadership.webp',
  mentorship: 'mentorship.webp',
  aboutUs: 'about-us.webp',
  institutionalPartners: 'institutional-partners.webp',
  avatars: {
    sarah: 'avatars/sarah.webp',
    marcus: 'avatars/marcus.webp',
    elena: 'avatars/elena.webp',
  },
} as const;
