import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://carer.edu.pk'),
  title: {
    default:
      'CARER | Nasir Uddin Centre for Applied Research & Educational Resources',
    template: '%s | CARER',
  },
  description:
    'Bridging academia and industry through cutting-edge research in energy, health, agriculture, and digital systems. Empowering the next generation through mentorship and certification programs.',
  keywords: [
    'applied research',
    'educational resources',
    'renewable energy',
    'health technologies',
    'agriculture innovation',
    'artificial intelligence',
    'research center Pakistan',
    'industry collaboration',
    'mentorship program',
    'certification programs',
  ],
  authors: [{ name: 'CARER' }],
  creator: 'Nasir Uddin Centre for Applied Research & Educational Resources',
  publisher: 'CARER',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://carer.edu.pk',
    siteName: 'CARER',
    title: 'CARER | Bridging Academia & Industry',
    description:
      'Leading center of excellence in applied research, driving sustainable growth and technological independence through innovation and integrity.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CARER - Applied Research & Educational Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CARER',
    description:
      'Bridging academia and industry through applied research and innovation.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* TODO: Review suppressHydrationWarning when implementing SSR/SSG optimizations.
          Currently suppresses warnings from browser extensions adding attributes like data-jetski-tab-id.
          May need to be removed or refined for production SSR implementation. */}
      <html lang="en" className="dark" suppressHydrationWarning>
        <head>
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              />
            </>
          )}
        </head>
        <body
          className={`${inter.className} antialiased bg-background text-foreground`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `,
              }}
            />
          )}
        </body>
      </html>
    </>
  );
}
