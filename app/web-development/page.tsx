import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { cache } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AddPackageToCartButton from '@/components/AddPackageToCartButton';
import { getPortfolioByService, type PortfolioItem } from '@/lib/portfolio';
import FooterNew from '@/components/FooterNew';

export const dynamic = 'force-dynamic';

type ContentSection = {
    id: string;
    type: 'text' | 'features' | 'gallery' | 'cta' | string;
    title: string;
    content?: string;
    imageUrl?: string;
    images?: string[];
    order?: number;
};

type ContentPageDoc = {
    slug: string;
    title?: string;
    sections?: ContentSection[];
    metaTitle?: string;
    metaDescription?: string;
};

type PackageDoc = {
    id: string;
    subcategoryId: string;
    name: string;
    price: number;
    overview?: string;
    features?: unknown;
    active?: boolean;
};

const DEFAULT_PAGE: ContentPageDoc = {
    slug: 'web-development',
    title: 'Web Development',
    sections: [
        {
            id: 'default-hero',
            type: 'text',
            title: 'Business Website Development',
            content: 'Your online presence starts here.',
            order: 0,
        },
        {
            id: 'default-about',
            type: 'text',
            title: 'About Business Website Development',
            content:
                "A website is the digital storefront of your business which is simple, professional, and built to make a strong first impression. Whether you're a small business owner, a freelancer, or a personal brand, this package gives you a clean, mobile-friendly website that communicates your story without unnecessary complexity.",
            order: 1,
        },
    ],
};

const parseFeatureList = (value: string): string[] =>
    value
        .split('\n')
        .map((line) => line.replace(/^[\-•*✅]\s*/, '').trim())
        .filter(Boolean);

const parseFaqText = (value: string): { question: string; answer: string }[] => {
    const lines = value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    const faqs: { question: string; answer: string }[] = [];
    for (let index = 0; index < lines.length; index += 2) {
        const question = lines[index];
        const answer = lines[index + 1];
        if (question && answer) {
            faqs.push({ question, answer });
        }
    }

    return faqs;
};

const formatTypeLabel = (type: string) => type.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const getOrderedSections = (sections?: ContentSection[]) => [...(sections ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const isFaqSection = (section: ContentSection) => {
    const normalizedTitle = section.title.toLowerCase();
    return normalizedTitle.includes('faq') || normalizedTitle.includes('frequently asked');
};

const heroFromSections = (doc: ContentPageDoc) => {
    const ordered = getOrderedSections(doc.sections);
    const firstText = ordered.find((section) => section.type === 'text') ?? ordered[0];

    return {
        title: firstText?.title || doc.title || 'Web Development',
        subtitle: firstText?.content || 'Premium digital experiences built for growth.',
    };
};

const SECTION_SPACING = 'px-4 py-16 sm:px-6 lg:px-8';
const SECTION_CONTAINER = 'mx-auto max-w-6xl';
const CARD_SURFACE = 'rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm';

const renderSection = (section: ContentSection, portfolioItems: PortfolioItem[] = []) => {
    if (section.type === 'features') {
        const features = parseFeatureList(section.content ?? '');
        return (
            <section key={section.id} className={`${SECTION_SPACING} border-t border-white/5`}>
                <div className={SECTION_CONTAINER}>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.title}</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={`${section.id}-${index}`} className={`${CARD_SURFACE} p-5`}>
                                <p className="text-sm leading-relaxed text-white/90">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (section.type === 'gallery') {
        const galleryItems: PortfolioItem[] =
            portfolioItems.length > 0
                ? portfolioItems
                : (section.images ?? []).map((image, index) => ({
                      id: `${section.id}-${index}`,
                      service: 'web-development',
                      title: section.title,
                      description: '' as string | null,                      imageUrl: image,
                      weblink: null,
                  }));
        return (
            <section key={section.id} className={`${SECTION_SPACING} border-t border-white/5`}>
                <div className={SECTION_CONTAINER}>
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.title}</h2>
                        <span className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 sm:inline-flex">Scroll to Explore</span>
                    </div>
                    <div className="relative mt-6">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-1 sm:pl-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-[#e6c166] shadow-lg backdrop-blur">
                                <ChevronLeft className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center pr-1 sm:pr-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-[#e6c166] shadow-lg backdrop-blur">
                                <ChevronRight className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
                            <div className="flex min-w-max gap-4 pl-12 pr-4 sm:pl-14">
                                {galleryItems.map((item, index) => {
                                    const card = (
                                        <article className="w-[280px] shrink-0 snap-start sm:w-[340px]">
                                            <div className={`${CARD_SURFACE} overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-[#e6c166]/60`}>
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title || `${section.title} ${index + 1}`}
                                                    className="h-60 w-full object-cover"
                                                    loading="lazy"
                                                />
                                                {(item.title || item.description) ? (
                                                    <div className="p-4">
                                                        {item.title ? <h3 className="text-base font-semibold">{item.title}</h3> : null}
                                                        {item.description ? <p className="mt-1 text-sm text-white/75 line-clamp-2">{item.description}</p> : null}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </article>
                                    );

                                    if (item.weblink) {
                                        return (
                                            <a key={item.id} href={item.weblink} target="_blank" rel="noreferrer" className="block">
                                                {card}
                                            </a>
                                        );
                                    }

                                    return <div key={item.id}>{card}</div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (section.type === 'cta') {
        return (
            <section key={section.id} className={`${SECTION_SPACING} border-t border-white/5`}>
                <div className={`${SECTION_CONTAINER} ${CARD_SURFACE} px-6 py-12 text-center sm:px-10`}>
                    <h2 className="text-3xl font-bold sm:text-4xl">{section.title}</h2>
                    {section.content ? <p className="mx-auto mt-3 max-w-2xl text-base text-white/85 sm:text-lg">{section.content}</p> : null}
                    <div className="mt-8">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center rounded-lg bg-[#e6c166] px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d7b156]"
                        >
                            Get a Free Quote
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    if (isFaqSection(section)) {
        const faqs = parseFaqText(section.content ?? '');
        return (
            <section key={section.id} className={`${SECTION_SPACING} border-t border-white/5`}>
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.title}</h2>
                    <div className="mt-6 space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={`${section.id}-${index}`} className={`${CARD_SURFACE} p-5`}>
                                <h3 className="text-lg font-medium">{faq.question}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/85">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (section.type === 'text') {
        return (
            <section key={section.id} className={`${SECTION_SPACING} border-t border-white/5`}>
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.title}</h2>
                    {section.content ? <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{section.content}</p> : null}
                </div>
            </section>
        );
    }

    return (
        <section key={section.id} className={`${SECTION_SPACING} border-t border-white/5`}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-2 inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/80">
                    {formatTypeLabel(section.type)}
                </div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.title}</h2>
                {section.content ? <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-white/85 sm:text-lg">{section.content}</p> : null}
                {(section.images ?? []).length > 0 ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {(section.images ?? []).map((image, index) => (
                            <div key={`${section.id}-unknown-${index}`} className={`${CARD_SURFACE} overflow-hidden`}>
                                <img src={image} alt={`${section.title} ${index + 1}`} className="h-56 w-full object-cover" loading="lazy" />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
};

const getContentPage = cache(async () => {
    const webDesignDoc = await prisma.contentPage.findFirst({ where: { slug: 'web-design' } });
    if (webDesignDoc) {
        return {
            slug: webDesignDoc.slug,
            title: webDesignDoc.title,
            sections: webDesignDoc.sections as ContentSection[],
            metaTitle: webDesignDoc.metaTitle ?? undefined,
            metaDescription: webDesignDoc.metaDescription ?? undefined,
        } as ContentPageDoc;
    }

    const webDevDoc = await prisma.contentPage.findFirst({ where: { slug: 'web-development' } });
    if (!webDevDoc) return null;
    return {
        slug: webDevDoc.slug,
        title: webDevDoc.title,
        sections: webDevDoc.sections as ContentSection[],
        metaTitle: webDevDoc.metaTitle ?? undefined,
        metaDescription: webDevDoc.metaDescription ?? undefined,
    } as ContentPageDoc;
});

const getWebDevPackages = cache(async (): Promise<PackageDoc[]> => {
    const subcategory = await prisma.subcategory.findFirst({ where: { slug: 'basic_website_dev' } });
    if (!subcategory) return [];

    const rows = await prisma.package.findMany({
        where: { subcategoryId: subcategory.id, active: true },
        orderBy: { price: 'asc' },
    });

    return rows.map((p) => ({
        id: p.id,
        subcategoryId: p.subcategoryId,
        name: p.name,
        price: Number(p.price),
        overview: p.overview ?? undefined,
        features: p.features,
        active: p.active,
    }));
});

const getWebDevPortfolio = cache(async () => getPortfolioByService('web-development'));

export const metadata: Metadata = {
  title: 'Web Development Services Melbourne | Custom Websites',
  description: 'Professional web development services in Melbourne. We build fast, responsive, SEO-friendly websites and web apps tailored to your business needs. Get a free quote!',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/web-development` },
  openGraph: {
    title: 'Web Development Services Melbourne | Custom Websites',
    description: 'Professional web development services in Melbourne. Fast, responsive, SEO-friendly websites.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/web-development`,
    type: 'website',
  },
};

const Page = async () => {
    const doc = await getContentPage();
    const packages = await getWebDevPackages();
    const portfolioItems = await getWebDevPortfolio();
    const pageDoc = doc ?? DEFAULT_PAGE;
    const orderedSections = getOrderedSections(pageDoc.sections);
    const bodySections = orderedSections.slice(1);
    const hero = heroFromSections(pageDoc);

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2229_0%,_#111318_45%,_#0a0c10_100%)] text-white">
            <section className="relative overflow-hidden border-b border-white/10 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
                <div className="pointer-events-none absolute inset-0 opacity-30 [background:linear-gradient(120deg,rgba(230,193,102,0.16)_0%,rgba(230,193,102,0.02)_40%,transparent_70%)]" />
                <div className="relative mx-auto max-w-6xl">
                    <span className="inline-flex rounded-full border border-[#e6c166]/40 bg-[#e6c166]/10 px-4 py-1 text-xs font-medium tracking-wide text-[#efd38f]">Web Development Service</span>
                    <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{hero.title}</h1>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">{hero.subtitle}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/#contact" className="rounded-lg bg-[#e6c166] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d7b156]">
                            Start Your Project
                        </Link>
                        <Link href="/projects" className="rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10">
                            Explore Projects
                        </Link>
                    </div>
                </div>
            </section>

            {packages.length > 0 ? (
                <section className={`${SECTION_SPACING} border-b border-white/10`}>
                    <div className={SECTION_CONTAINER}>
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Website Pricing</h2>
                            <p className="text-sm text-white/70">Subcategory: basic_website_dev</p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {packages.map((pkg) => {
                                const uiFeatures: string[] = Array.isArray(pkg.features)
                                    ? (pkg.features as unknown[]).map((f: unknown) =>
                                          typeof f === 'string' ? f : ((f as Record<string, unknown>)?.name as string) ?? ''
                                      ).filter(Boolean)
                                    : [];
                                return (
                                <article key={pkg.id} className={`${CARD_SURFACE} flex flex-col p-6`}>
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-2xl font-semibold">{pkg.name}</h3>
                                        <p className="text-3xl font-black text-[#e6c166]">${pkg.price}</p>
                                    </div>

                                    {pkg.overview ? <p className="mt-3 text-sm leading-relaxed text-white/80">{pkg.overview}</p> : null}

                                    <ul className="mt-5 space-y-2 text-sm text-white/90">
                                        {uiFeatures.map((feature, index) => (
                                            <li key={`${pkg.id}-feature-${index}`} className="flex gap-2">
                                                <span className="text-[#e9c468]">•</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <AddPackageToCartButton id={pkg.id} name={pkg.name} price={pkg.price} subcategoryId={pkg.subcategoryId} />
                                </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ) : null}

            {bodySections.map((section) => renderSection(section, portfolioItems))}

            <FooterNew/>
        </main>
    );
};

export default Page;
