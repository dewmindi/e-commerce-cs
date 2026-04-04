
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PANEL_URL = process.env.NEXT_ADMIN_PANEL_URL || 'http://localhost:3001';
const REVALIDATE_SECRET = process.env.NEXT_REVALIDATE_SECRET;

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': ADMIN_PANEL_URL,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-revalidate-secret',
    },
  });
}

export async function POST(request: NextRequest) {
  // 1. Check if the secret token is valid
  const secret = request.headers.get('x-revalidate-secret');
  if (secret !== REVALIDATE_SECRET) {
    // Return an unauthorized error if the secret is missing or incorrect
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // 2. If the secret is valid, proceed with revalidation
  revalidateTag("quote-data", "max");
  revalidateTag("portfolio", "max");

  // 3. Send the successful response with the required CORS headers
  return NextResponse.json(
    {
      success: true,
      revalidated: true,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': ADMIN_PANEL_URL,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-revalidate-secret',
      },
    }
  );
}