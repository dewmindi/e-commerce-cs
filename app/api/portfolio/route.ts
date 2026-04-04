import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioByService } from '@/lib/portfolio';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service') ?? 'web-development';

    try {
        const data = await getPortfolioByService(service);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Portfolio API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
