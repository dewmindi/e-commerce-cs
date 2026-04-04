import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au';

export const metadata: Metadata = {
  title: 'Our Projects – Portfolio | CS Graphic Meta',
  description: 'Browse 5,000+ completed design projects by CS Graphic Meta including logos, business cards, packaging, websites and more.',
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
  openGraph: {
    title: 'Our Projects – Portfolio | CS Graphic Meta',
    description: 'Browse 5,000+ completed design projects by CS Graphic Meta.',
    url: `${BASE_URL}/projects`,
    type: 'website',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
