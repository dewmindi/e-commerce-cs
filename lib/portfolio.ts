import { unstable_cache } from 'next/cache';
import clientPromise from '@/lib/mongodb';

export type PortfolioItem = {
    _id: string;
    service: string;
    title: string;
    description: string;
    imageUrl: string;
    weblink: string | null;
};

export const getPortfolioByService = unstable_cache(
    async (service: string): Promise<PortfolioItem[]> => {
        const client = await clientPromise;
        const db = client.db('cs-ecommerce');
        const items = await db
            .collection('portfolio_items')
            .find({ service })
            .sort({ createdAt: -1 })
            .toArray();
        return items.map((i) => ({
            _id: i._id.toString(),
            service: i.service as string,
            title: i.title as string,
            description: i.description as string,
            imageUrl: i.imageUrl as string,
            weblink: (i.weblink as string | undefined) ?? null,
        }));
    },
    ['portfolio'],
    { tags: ['portfolio'], revalidate: false }
);
