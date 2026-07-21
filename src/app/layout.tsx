import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://avataran.vercel.app'),
  title: 'AVATARAN — Immersive Ramayana Digital Monument & Narrative Journey',
  description: 'A digital monument and immersive visual narrative journey narrating all Seven Kandas of the Ramayana. Relive the divine story of Shri Ram.',
  keywords: ['Ramayana', 'Shri Ram', 'Ayodhya', 'Bala Kanda', 'Sundara Kanda', 'Ram Mandir', 'Valmiki Ramayana', 'Ramcharitmanas', 'Digital Monument'],
  authors: [{ name: 'Vortex Engineering Team' }],
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Avataran',
  },
  icons: {
    icon: '/assets/logo.jpg',
    shortcut: '/assets/logo.jpg',
    apple: '/icons/icon-512.png',
  },
  openGraph: {
    title: 'AVATARAN — Immersive Ramayana Digital Monument & Narrative Journey',
    description: 'A cinematic, scroll-driven web experience narrating the complete life of Shri Ram across all seven Kandas of the Ramayana.',
    url: 'https://avataran.vercel.app',
    siteName: 'AVATARAN',
    type: 'website',
    images: [{ url: '/assets/background.jpg', width: 1200, height: 630, alt: 'AVATARAN Ramayana Experience' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVATARAN — Immersive Ramayana Web Experience',
    description: 'Relive the divine story of Shri Ram across all seven Kandas in an interactive digital monument.',
    images: ['/assets/background.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0907',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AVATARAN — Immersive Ramayana Experience',
  url: 'https://avataran.vercel.app',
  description: 'A cinematic, scroll-driven digital monument narrating the complete life of Shri Ram across all seven Kandas of the Ramayana.',
  applicationCategory: 'Cultural & Educational Experience',
  operatingSystem: 'All',
  author: {
    '@type': 'Organization',
    name: 'Vortex Team',
  },
  about: {
    '@type': 'Book',
    name: 'Ramayana',
    author: 'Maharishi Valmiki',
    inLanguage: ['en', 'hi', 'sa'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(reg) {
                      console.log('ServiceWorker registered with scope:', reg.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

