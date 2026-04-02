import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Media Growth Services Melbourne',
  description: 'Grow your social media following and engagement with our proven strategies in Melbourne. More followers, more reach, measurable results for your business.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/social-media-growth` },
  openGraph: {
    title: 'Social Media Growth Services Melbourne',
    description: 'Grow your social media following and engagement with our proven strategies in Melbourne.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/social-media-growth`,
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
