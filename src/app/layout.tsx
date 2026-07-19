import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AVATARAN — Immersive Ramayana Web Experience',
  description: 'A digital monument and immersive visual narrative journey through the Ramayana. Relive the story of Shri Ram.',
  keywords: 'Ramayana, Shri Ram, Ayodhya, Panchavati, Sundara Kanda, Immersive Web, WebGL, GSAP',
  authors: [{ name: 'DeepMind Advanced Agentic Coding Team' }],
  manifest: '/manifest.json',
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
    title: 'AVATARAN — Immersive Ramayana Web Experience',
    description: 'A digital monument and immersive visual narrative journey through the Ramayana.',
    type: 'website',
    images: [{ url: '/assets/background.jpg' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0907',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
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
