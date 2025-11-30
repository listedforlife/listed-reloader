import { createClient } from 'contentful';
import type { Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Initialize Contentful client (only if credentials are provided)
// These are now server-side only (no NEXT_PUBLIC_ prefix)
const isContentfulConfigured = !!(
  process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
);

const client = isContentfulConfigured
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    })
  : null;

// Type definitions
export interface Artist {
  id: string;
  attributes: {
    name: string;
    slug: string;
    bio?: string | Document;
    image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    soundcloud?: string;
    video?: string;
    socialLinks?: {
      soundcloud?: string;
      instagram?: string;
      spotify?: string;
      facebook?: string;
      residentAdvisor?: string;
      'twitter/x'?: string;
    };
    gigwellAgencyId?: string;
    gigwellArtistId?: string;
    gigwellSettings?: string;
    gigwellStandaloneProfile?: string;
  };
}

export interface Post {
  id: string;
  attributes: {
    title: string;
    slug: string;
    content: string | Document;
    excerpt: string;
    createdAt: string;
    image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category?: {
      data: {
        id: string;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
  };
}

export interface Event {
  id: string;
  attributes: {
    title: string;
    slug: string;
    description: string;
    date: string;
    venue: string;
    image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

// Helper function to transform Contentful Asset to our format
function transformAsset(asset: Asset | undefined) {
  if (!asset?.fields?.file) return undefined;

  // Type guard to ensure we have the URL property
  const file = asset.fields.file as any;
  if (!file.url) return undefined;

  const url = file.url as string;

  return {
    data: {
      attributes: {
        url: url.startsWith('//') ? `https:${url}` : url,
      },
    },
  };
}

// Helper function to get image URL
export function getContentfulImageUrl(image: any): string {
  if (!image?.data?.attributes?.url && !image?.fields?.file?.url) {
    return '/images/logo.png'; // Default image
  }

  // Handle Contentful asset format
  if (image?.fields?.file?.url) {
    const url = image.fields.file.url;
    return url.startsWith('//') ? `https:${url}` : url;
  }

  // Handle our transformed format
  const url = image?.data?.attributes?.url || '';
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;
  }

  return `/${url}`;
}

// Sample data as fallback when Contentful is not configured
const sampleArtists: Artist[] = [
  { id: '1', attributes: { name: 'Atish', slug: 'atish' } },
  { id: '2', attributes: { name: 'Ben Annand', slug: 'ben-annand' } },
  { id: '3', attributes: { name: 'Dory', slug: 'dory' } },
  { id: '4', attributes: { name: 'Halo Varga', slug: 'halo-varga' } },
  { id: '5', attributes: { name: 'Jay Tripwire', slug: 'jay-tripwire' } },
  {
    id: '6',
    attributes: { name: 'Justin Marchacos', slug: 'justin-marchacos' },
  },
  { id: '7', attributes: { name: 'KMLN', slug: 'kmln' } },
  { id: '8', attributes: { name: 'Lovestruckk', slug: 'lovestruckk' } },
  { id: '9', attributes: { name: 'M.O.N.R.O.E', slug: 'm-o-n-r-o-e' } },
  { id: '10', attributes: { name: 'Mark Slee', slug: 'mark-slee' } },
  { id: '11', attributes: { name: 'Maxi Storrs', slug: 'maxi-storrs' } },
  { id: '12', attributes: { name: 'Mightykat', slug: 'mightykat' } },
  { id: '13', attributes: { name: 'Mr. C', slug: 'mr-c' } },
  { id: '14', attributes: { name: 'Naveen G', slug: 'naveen-g' } },
  { id: '15', attributes: { name: 'Nico Stojan', slug: 'nico-stojan' } },
  { id: '16', attributes: { name: 'Nikita', slug: 'nikita' } },
  { id: '17', attributes: { name: 'Holmar', slug: 'holmar' } },
  { id: '18', attributes: { name: 'Galen', slug: 'galen' } },
  { id: '19', attributes: { name: 'Nitin', slug: 'nitin' } },
  { id: '20', attributes: { name: 'Bilaliwood', slug: 'bilaliwood' } },
  { id: '21', attributes: { name: 'H-Foundation', slug: 'h-foundation' } },
  { id: '22', attributes: { name: 'Ray Zuniga', slug: 'ray-zuniga' } },
  { id: '23', attributes: { name: 'Philipp Jung', slug: 'philipp-jung' } },
  { id: '24', attributes: { name: 'Anja Schneider', slug: 'anja-schneider' } },
  { id: '25', attributes: { name: 'Atnarko', slug: 'atnarko' } },
  {
    id: '26',
    attributes: {
      name: 'Sinca',
      slug: 'sinca',
      image: { data: { attributes: { url: '/images/Sinca.jpeg' } } },
    },
  },
  { id: '27', attributes: { name: 'N/UM', slug: 'n-um' } },
  { id: '28', attributes: { name: 'Matt Caines', slug: 'matt-caines' } },
  { id: '29', attributes: { name: 'Reza Safinia', slug: 'reza-safinia' } },
  { id: '30', attributes: { name: 'Saqib', slug: 'saqib' } },
  {
    id: '31',
    attributes: { name: 'Beauty & The Beast', slug: 'beauty-the-beast' },
  },
  { id: '32', attributes: { name: 'Formerly', slug: 'formerly' } },
  {
    id: '33',
    attributes: {
      name: 'Camea',
      slug: 'camea',
      image: { data: { attributes: { url: '/images/camea.png' } } },
    },
  },
  { id: '34', attributes: { name: 'Niki Sadeki', slug: 'niki-sadeki' } },
];

const samplePosts: Post[] = [
  {
    id: '1',
    attributes: {
      title: 'Art With Me Miami',
      slug: 'art-with-me-miami',
      createdAt: '2021-11-19T00:00:00Z',
      excerpt: 'Listed Productions brings the underground vibe to Miami Beach.',
      content: 'Full article content here',
      image: {
        data: {
          attributes: {
            url: '/images/mainone.png',
          },
        },
      },
    },
  },
  {
    id: '2',
    attributes: {
      title: 'Lee Coombs Live at The Cityfox Odyssey NYE',
      slug: 'lee-coombs-cityfox',
      createdAt: '2021-12-31T00:00:00Z',
      excerpt: "An unforgettable New Year's Eve performance.",
      content: 'Full article content here',
      image: {
        data: {
          attributes: {
            url: '/images/Sinca.jpeg',
          },
        },
      },
    },
  },
  {
    id: '3',
    attributes: {
      title: 'The Real Deal Party Feel Feat. Atish',
      slug: 'real-deal-atish',
      createdAt: '2021-09-29T00:00:00Z',
      excerpt: 'A marathon session with Listed friends.',
      content: 'Full article content here',
      image: {
        data: {
          attributes: {
            url: '/images/camea.png',
          },
        },
      },
    },
  },
];

// Fetch functions
export async function getArtists(): Promise<Artist[]> {
  try {
    // Check if Contentful is configured
    if (!client) {
      console.log('Contentful not configured, using sample data');
      return sampleArtists;
    }

    const entries = await client.getEntries({
      content_type: 'artist',
      order: ['fields.title'],
      limit: 100,
    });

    return entries.items.map((entry: any) => ({
      id: entry.sys.id,
      attributes: {
        name: (entry.fields.title as string) || '',
        slug: (entry.fields.slug as string) || '',
        bio: (entry.fields.bio as string | Document) || '',
        image: transformAsset(
          (entry.fields.featuredImage || entry.fields.profileImage) as
            | Asset
            | undefined
        ),
        soundcloud:
          ((entry.fields.socialLinks as any)?.soundcloud as string) || '',
        video: (entry.fields.video as string) || '',
        socialLinks: (entry.fields.socialLinks as any) || {},
      },
    }));
  } catch (error) {
    console.error('Error fetching artists from Contentful:', error);
    return sampleArtists;
  }
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  try {
    if (!client) {
      const artist = sampleArtists.find(a => a.attributes.slug === slug);
      if (
        artist &&
        (slug === 'sinca' || slug === 'camea' || slug === 'atish')
      ) {
        return {
          ...artist,
          attributes: {
            ...artist.attributes,
            bio: `${artist.attributes.name} is a renowned DJ and producer in the electronic music scene.`,
            soundcloud:
              'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            socialLinks: {
              soundcloud: 'https://soundcloud.com',
              instagram: 'https://instagram.com',
            },
          },
        };
      }
      return artist || null;
    }

    const entries = await client.getEntries({
      content_type: 'artist',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0];

    return {
      id: entry.sys.id,
      attributes: {
        name: (entry.fields.title as string) || '',
        slug: (entry.fields.slug as string) || '',
        bio: (entry.fields.bio as string | Document) || '',
        image: transformAsset(
          (entry.fields.featuredImage || entry.fields.profileImage) as
            | Asset
            | undefined
        ),
        soundcloud:
          ((entry.fields.socialLinks as any)?.soundcloud as string) || '',
        video: (entry.fields.video as string) || '',
        socialLinks: (entry.fields.socialLinks as any) || {},
        gigwellAgencyId: entry.fields.gigwellAgencyId as string,
        gigwellArtistId: entry.fields.gigwellArtistId as string,
        gigwellSettings: entry.fields.gigwellSettings as string,
        gigwellStandaloneProfile: entry.fields
          .gigwellStandaloneProfile as string,
      },
    };
  } catch (error) {
    console.error('Error fetching artist from Contentful:', error);
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    if (!client) {
      return samplePosts;
    }

    const entries = await client.getEntries({
      content_type: 'post',
      order: ['-sys.createdAt'],
      limit: 50,
    });

    return entries.items.map((entry: any) => ({
      id: entry.sys.id,
      attributes: {
        title: (entry.fields.title as string) || '',
        slug: (entry.fields.slug as string) || '',
        content: (entry.fields.content as string | Document) || '',
        excerpt: (entry.fields.excerpt as string) || '',
        createdAt: entry.sys.createdAt,
        image: transformAsset(entry.fields.featuredImage as Asset | undefined),
        category: entry.fields.category
          ? {
              data: {
                id: (entry.fields.category as any).sys.id,
                attributes: {
                  name: (entry.fields.category as any).fields?.name || 'News',
                  slug: (entry.fields.category as any).fields?.slug || 'news',
                },
              },
            }
          : undefined,
      },
    }));
  } catch (error) {
    console.error('Error fetching posts from Contentful:', error);
    return samplePosts;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    if (!client) {
      return samplePosts.find(p => p.attributes.slug === slug) || null;
    }

    const entries = await client.getEntries({
      content_type: 'post',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0];
    return {
      id: entry.sys.id,
      attributes: {
        title: (entry.fields.title as string) || '',
        slug: (entry.fields.slug as string) || '',
        content: (entry.fields.content as string | Document) || '',
        excerpt: (entry.fields.excerpt as string) || '',
        createdAt: entry.sys.createdAt,
        image: transformAsset(entry.fields.featuredImage as Asset | undefined),
        category: entry.fields.category
          ? {
              data: {
                id: (entry.fields.category as any).sys.id,
                attributes: {
                  name: (entry.fields.category as any).fields?.name || 'News',
                  slug: (entry.fields.category as any).fields?.slug || 'news',
                },
              },
            }
          : undefined,
      },
    };
  } catch (error) {
    console.error('Error fetching post from Contentful:', error);
    return null;
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    if (!client) {
      return [];
    }

    const entries = await client.getEntries({
      content_type: 'event',
      order: ['-fields.date'],
      limit: 50,
    });

    return entries.items.map((entry: any) => ({
      id: entry.sys.id,
      attributes: {
        title: (entry.fields.title as string) || '',
        slug: (entry.fields.slug as string) || '',
        description: (entry.fields.description as string) || '',
        date: (entry.fields.date as string) || '',
        venue: (entry.fields.venue as string) || '',
        image: transformAsset(entry.fields.image as Asset | undefined),
      },
    }));
  } catch (error) {
    console.error('Error fetching events from Contentful:', error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    if (!client) {
      return null;
    }

    const entries = await client.getEntries({
      content_type: 'event',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0];
    return {
      id: entry.sys.id,
      attributes: {
        title: (entry.fields.title as string) || '',
        slug: (entry.fields.slug as string) || '',
        description: (entry.fields.description as string) || '',
        date: (entry.fields.date as string) || '',
        venue: (entry.fields.venue as string) || '',
        image: transformAsset(entry.fields.image as Asset | undefined),
      },
    };
  } catch (error) {
    console.error('Error fetching event from Contentful:', error);
    return null;
  }
}
