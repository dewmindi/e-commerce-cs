import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Media Management Services Melbourne',
  description: 'Professional social media management in Melbourne. We handle your content calendar, posting, engagement, and growth so you can focus on your business.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/social-media-management` },
  openGraph: {
    title: 'Social Media Management Services Melbourne',
    description: 'Professional social media management in Melbourne. Content, posting, and engagement handled for you.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/social-media-management`,
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
