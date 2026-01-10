import { getProduct } from '@/lib/printify';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProduct(params.id);
    if (!product) {
      return new NextResponse(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({ message: error.message || 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
