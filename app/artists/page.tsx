'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getArtists, getContentfulImageUrl, Artist } from '@/lib/contentful';

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getArtists().then(setArtists);
  }, []);

  // Sample artists data if no data source is connected
  const sampleArtists = [
    { 
      id: 1,
      attributes: { 
        name: 'Sinca', 
        slug: 'sinca', 
        image: {
          data: {
            attributes: {
              url: '/images/Sinca.jpeg'
            }
          }
        }
      }
    },
    { 
      id: 2,
      attributes: { 
        name: 'Camea', 
        slug: 'camea', 
        image: {
          data: {
            attributes: {
              url: '/images/camea.png'
            }
          }
        }
      }
    },
    { 
      id: 3,
      attributes: { 
        name: 'Atish', 
        slug: 'atish', 
        image: {
          data: {
            attributes: {
              url: '/images/mainone.png'
            }
          }
        }
      }
    }
  ];

  const displayArtists = artists.length > 0 ? artists : sampleArtists;

  const getArtistLinkColorClass = (index: number) => {
    const colors = ['#ffffff', '#e476ae', '#ef4137', '#1895d3', '#f8ec21', '#814199', '#12b258'];
    return colors[index % colors.length];
  };

  return (
    <div className="container-custom" style={{ marginTop: isMobile ? '60px' : '70px' }}>
      <h1 style={{ marginBottom: '40px' }}>ARTISTS</h1>
      <section style={{ marginBottom: '60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '20px',
          marginLeft: isMobile ? '0' : '69px',
          marginRight: isMobile ? '0' : '69px'
        }}>
          {displayArtists.map((artist: any, index: number) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.attributes.slug}`}
              style={{
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
                color: getArtistLinkColorClass(index)
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: '100%',
                paddingBottom: '100%',
                position: 'relative',
                marginBottom: '10px',
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}>
                {artist.attributes.image ? (
                  <Image
                    src={getContentfulImageUrl(artist.attributes.image)}
                    alt={artist.attributes.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.8rem'
                  }}>
                    No Image
                  </div>
                )}
              </div>
              <h2 style={{ fontSize: '2rem', fontFamily: "'dinBoldFont', sans-serif", margin: '0' }}>
                {artist.attributes.name}
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
