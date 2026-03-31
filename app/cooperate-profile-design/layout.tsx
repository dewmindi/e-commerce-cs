import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Profile Design Services Melbourne',
  description: 'Professional corporate profile and company brochure design in Melbourne. Make a strong first impression with a polished, on-brand corporate profile.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/cooperate-profile-design` },
  openGraph: {
    title: 'Corporate Profile Design Services Melbourne',
    description: 'Professional corporate profile and company brochure design in Melbourne.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/cooperate-profile-design`,
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
