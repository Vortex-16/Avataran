import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AVATARAN — Immersive Ramayana Web Experience',
  description: 'A digital monument and immersive visual narrative journey through the Ramayana. Relive the story of Shri Ram.',
  keywords: 'Ramayana, Shri Ram, Ayodhya, Panchavati, Sundara Kanda, Immersive Web, WebGL, GSAP',
  authors: [{ name: 'DeepMind Advanced Agentic Coding Team' }],
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: 'AVATARAN — Immersive Ramayana Web Experience',
    description: 'A digital monument and immersive visual narrative journey through the Ramayana.',
    type: 'website',
    images: [{ url: '/assets/background.png' }],
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
      </body>
    </html>
  );
}
