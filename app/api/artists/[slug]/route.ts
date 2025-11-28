import { NextResponse } from 'next/server';
import { getArtistBySlug } from '@/lib/contentful';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const artist = await getArtistBySlug(params.slug);

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    return NextResponse.json(artist);
  } catch (error) {
    console.error('Error fetching artist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artist' },
      { status: 500 }
    );
  }
}
