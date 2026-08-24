import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Sidebar } from '@/components/Sidebar';
import { getRuleCMSToken } from '@/lib/rulecms-config';
import { RuleCMSProvider } from './providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'RuleCMS widget gallery (Next.js, no Tailwind)',
    template: '%s · RuleCMS gallery',
  },
  description:
    'A Next.js host with no Tailwind configuration. Embedded RuleCMS widgets bring their own compiled CSS, including resolved Tailwind utility classes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = getRuleCMSToken();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RuleCMSProvider token={token}>
          <div className="gallery-shell">
            <Sidebar />
            <main className="gallery-main">{children}</main>
          </div>
        </RuleCMSProvider>
      </body>
    </html>
  );
}
