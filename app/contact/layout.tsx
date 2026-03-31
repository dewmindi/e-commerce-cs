import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au';

export const metadata: Metadata = {
  title: 'Contact Us | CS Graphic Meta – Melbourne Design Agency',
  description:
    'Get in touch with CS Graphic Meta. Contact our Melbourne design team for logo design, graphic design, web development, and more. Fast response, affordable pricing.',
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: 'Contact CS Graphic Meta | Melbourne Design Agency',
    description:
      'Reach out to our Melbourne design experts for logos, websites, branding & more. We respond fast!',
    url: `${BASE_URL}/contact`,
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
