import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

export type PortfolioItem = {
    id: string;
    service: string;
    title: string;
    description: string | null;
    imageUrl: string;
    weblink: string | null;
};

export const getPortfolioByService = unstable_cache(
    async (service: string): Promise<PortfolioItem[]> => {
        const items = await prisma.portfolioItem.findMany({
            where: { service },
            orderBy: { createdAt: 'desc' },
        });
        return items.map((i:any) => ({
            id: i.id,
            service: i.service,
            title: i.title,
            description: i.description,
            imageUrl: i.imageUrl,
            weblink: i.weblink,
        }));
    },
    ['portfolio'],
    { tags: ['portfolio'], revalidate: false }
);
