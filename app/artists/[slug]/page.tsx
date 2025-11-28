'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArtistBySlug, getContentfulImageUrl } from '@/lib/contentful';
import { FaSoundcloud, FaInstagram, FaSpotify, FaFacebookF } from 'react-icons/fa';
import { SiDiscogs } from 'react-icons/si'; // Using Discogs as alternative for RA

// Sample data for demonstration if Contentful is not connected
const sampleArtistData: { [key: string]: any } = {
  'sinca': {
    sys: { id: 'sinca-1' },
    fields: {
      name: 'Sinca',
      slug: 'sinca',
      bio: 'Sinca is a rising star in the San Francisco electronic music scene...',
      image: {
        fields: { title: 'Sinca', file: { url: '/images/Sinca.jpeg' } },
        sys: { id: 'img-sinca' }
      },
      soundcloud: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instagram: 'https://instagram.com'
    }
  },
  'camea': {
    sys: { id: 'camea-1' },
    fields: {
      name: 'Camea',
      slug: 'camea',
      bio: 'Camea is known for her deep, hypnotic techno sets...',
      image: {
        fields: { title: 'Camea', file: { url: '/images/camea.png' } },
        sys: { id: 'img-camea' }
      },
      soundcloud: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com',
      instagram: 'https://instagram.com',
      residentAdvisor: 'https://ra.co'
    }
  },
  'atish': {
    sys: { id: 'atish-1' },
    fields: {
      name: 'Atish',
      slug: 'atish',
      bio: 'Atish brings a unique blend of house and techno...',
      image: {
        fields: { title: 'Atish', file: { url: '/images/mainone.png' } },
        sys: { id: 'img-atish' }
      },
      soundcloud: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com'
    }
  }
};

export default function ArtistPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const animRef = useRef<HTMLDivElement>(null);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);

      // Try to fetch from Strapi first
      const strapiArtist = await getArtistBySlug(slug);

      if (strapiArtist) {
        setArtist(strapiArtist);
      } else {
        // Fallback to sample data
        const sampleData = sampleArtistData[slug];
        if (sampleData) {
          setArtist({
            attributes: sampleData
          });
        }
      }
      setLoading(false);
    };

    fetchArtist();
  }, [slug]);

  // Animated color bar effect
  useEffect(() => {
    if (!animRef.current) return;

    const colors = ["#ffffff", "#e476ae", "#ef4137", "#1895d3", "#f8ec21", "#814199", "#12b258"];
    let delayTimer: NodeJS.Timeout | null = null;
    let durationTimer: NodeJS.Timeout | null = null;

    const getRandomIntInclusive = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const tick = () => {
      if (!animRef.current) return;
      animRef.current.classList.remove("active");
      const time = getRandomIntInclusive(1000, 2500);
      const newStyles = {
        backgroundColor: colors[getRandomIntInclusive(0, colors.length - 1)],
        left: `${getRandomIntInclusive(0, 98)}%`,
        height: `${getRandomIntInclusive(10, 90)}%`,
      };
      Object.assign(animRef.current.style, newStyles);
      delayTimer = setTimeout(() => {
        if (animRef.current) {
          animRef.current.classList.add("active");
        }
      }, 100);
      durationTimer = setTimeout(tick, getRandomIntInclusive(1500, 3000));
    };

    durationTimer = setTimeout(tick, 0);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (durationTimer) clearTimeout(durationTimer);
    };
  }, [artist]);

  if (loading) {
    return <div className="container-custom" style={{ textAlign: 'center', marginTop: '100px', fontSize: '2rem' }}>Loading artist...</div>;
  }

  if (!artist) {
    return <div className="container-custom" style={{ textAlign: 'center', marginTop: '100px', fontSize: '2rem' }}>Artist not found.</div>;
  }

  const imageUrl = artist.attributes.image;

  return (
    <main style={{ marginTop: isMobile ? '60px' : '70px' }}>
      <article>
        {/* Featured Image with animated bar */}
        <div style={{
          padding: 0,
          margin: isMobile ? '0px 20px' : '0px 69px',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Animated color bar */}
            <div
              ref={animRef}
              className="anim"
              style={{
                width: '10px',
                height: '50%',
                top: '-100%',
                position: 'absolute',
                filter: 'blur(8px)',
                transitionTimingFunction: 'cubic-bezier(.21,.31,1,.27)',
                transitionProperty: 'top',
                transitionDuration: '1500ms',
                left: '40%',
                backgroundColor: '#ffffff'
              }}
            ></div>
            {imageUrl ? (
              <Image
                src={getContentfulImageUrl(imageUrl)}
                alt={artist.attributes.name}
                width={1200}
                height={800}
                style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: isMobile ? '300px' : '500px',
                backgroundColor: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Artist Name */}
        <h1 style={{ marginTop: '20px' }}>
          {artist.attributes.name.toUpperCase()}
        </h1>

        {/* Content Area */}
        <div style={{
          display: isMobile ? 'block' : 'flex',
          gap: '20px',
          marginBottom: '60px'
        }}>
          {/* Bio Text - Left Side */}
          <div style={{
            width: isMobile ? '100%' : '48%',
            float: isMobile ? 'none' : 'left'
          }}>
            <div style={{
              color: 'white',
              fontSize: '1.6rem',
              textAlign: 'left',
              marginLeft: isMobile ? '20px' : '69px',
              marginRight: isMobile ? '20px' : '69px',
              overflow: 'scroll',
              height: isMobile ? 'auto' : '850px',
              padding: isMobile ? '1em' : '0',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}>
              <p style={{ lineHeight: '1.8' }}>
                {artist.attributes.bio || 'No biography available yet.'}
              </p>

              {/* Social Links */}
              {artist.attributes.socialLinks && (
                <div style={{
                  marginTop: '20px',
                  display: 'flex',
                  gap: '15px',
                  flexWrap: 'wrap',
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                  {artist.attributes.socialLinks.soundcloud && (
                    <a href={artist.attributes.socialLinks.soundcloud} target="_blank" rel="noopener noreferrer" style={{ color: '#ff7700' }}>
                      <FaSoundcloud size={30} />
                    </a>
                  )}
                  {artist.attributes.socialLinks.instagram && (
                    <a href={artist.attributes.socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#C13584' }}>
                      <FaInstagram size={30} />
                    </a>
                  )}
                  {artist.attributes.socialLinks.spotify && (
                    <a href={artist.attributes.socialLinks.spotify} target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954' }}>
                      <FaSpotify size={30} />
                    </a>
                  )}
                  {artist.attributes.socialLinks.facebook && (
                    <a href={artist.attributes.socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ color: '#4267B2' }}>
                      <FaFacebookF size={30} />
                    </a>
                  )}
                  {artist.attributes.socialLinks.residentAdvisor && (
                    <a href={artist.attributes.socialLinks.residentAdvisor} target="_blank" rel="noopener noreferrer" style={{ color: '#FF3300' }}>
                      <SiDiscogs size={30} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Widgets - Right Side */}
          <div style={{
            marginRight: isMobile ? '20px' : '69px',
            marginLeft: isMobile ? '20px' : '0',
            width: isMobile ? '100%' : '49%',
            marginTop: isMobile ? '20px' : '0'
          }}>
            {/* Video Widget */}
            {artist.attributes.video && (
              <iframe
                title="video widget"
                src={artist.attributes.video}
                style={{
                  width: '100%',
                  height: isMobile ? (window.innerWidth <= 380 ? '220px' : '310px') : '380px',
                  marginBottom: '20px',
                  backgroundColor: 'black'
                }}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {/* SoundCloud Widget */}
            {artist.attributes.soundcloud && (
              <iframe
                src={artist.attributes.soundcloud}
                title="sc widget"
                style={{
                  width: '100%',
                  height: isMobile ? (window.innerWidth <= 380 ? '160px' : '260px') : '320px',
                  backgroundColor: 'black'
                }}
                frameBorder="0"
                allow="encrypted-media"
              />
            )}

            {/* If no widgets, show placeholder */}
            {!artist.attributes.video && !artist.attributes.soundcloud && (
              <div style={{
                width: '100%',
                height: isMobile ? '200px' : '300px',
                backgroundColor: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem'
              }}>
                No video or soundcloud content available.
              </div>
            )}
          </div>
        </div>

        {/* Back to Artists Link */}
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
          <Link href="/artists" style={{
            color: '#ffffff',
            textTransform: 'uppercase',
            background: '#000000',
            fontSize: '1.4rem',
            padding: '20px',
            opacity: 0.9,
            border: '4px solid #ffffff',
            borderRadius: '6px',
            display: 'inline-block',
            transition: 'all 0.3s ease 0s',
            width: '170px',
            textDecoration: 'none'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.color = '#00ff1e';
            e.currentTarget.style.borderRadius = '50px';
            e.currentTarget.style.borderColor = '#2bf203';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderRadius = '6px';
            e.currentTarget.style.borderColor = '#ffffff';
          }}>
            Back to Artists
          </Link>
        </div>
      </article>
    </main>
  );
}
