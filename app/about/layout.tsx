import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | CS Graphic Meta – Melbourne Design Agency',
  description: 'Learn about CS Graphic Meta, Melbourne\'s trusted graphic design and web development agency. 5,000+ projects completed, serving clients across Australia.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/about` },
  openGraph: {
    title: 'About CS Graphic Meta | Melbourne Design Agency',
    description: 'Learn about CS Graphic Meta, Melbourne\'s trusted graphic design and web development agency.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/about`,
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
