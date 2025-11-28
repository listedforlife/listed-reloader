import { NextResponse } from 'next/server';
import { getArtists } from '@/lib/contentful';

export async function GET() {
  try {
    const artists = await getArtists();
    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    );
  }
}
