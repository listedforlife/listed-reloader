'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getArtists } from '@/lib/contentful';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Image slides
const imageSlides = [
  'https://ucarecdn.com/f76fb93f-e0c5-4e5b-8170-e6ee78fb7d24/',
  'https://ucarecdn.com/efacb135-19a0-45e0-af94-33e9fe01b72f/-/crop/2000x1485/0,0/-/preview/',
  'https://ucarecdn.com/0eccca9b-467c-473f-950c-9f419503f636/',
  'https://ucarecdn.com/15d81712-a4ae-4154-b161-574b784c87c3/'
];

// Sample posts data (matching the format from contentful.ts)
const samplePosts = [
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
            url: '/images/mainone.png'
          }
        }
      }
    }
  },
  {
    id: '2',
    attributes: {
      title: 'Lee Coombs Live at The Cityfox Odyssey NYE',
      slug: 'lee-coombs-cityfox',
      createdAt: '2021-12-31T00:00:00Z',
      excerpt: 'An unforgettable New Year\'s Eve performance.',
      content: 'Full article content here',
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
            url: '/images/camea.png'
          }
        }
      }
    }
  }
];

// Sample artists data (fallback when Contentful is not configured)
const sampleArtists = [
  { id: '1', attributes: { name: 'Atish', slug: 'atish' } },
  { id: '2', attributes: { name: 'Ben Annand', slug: 'ben-annand' } },
  { id: '3', attributes: { name: 'Dory', slug: 'dory' } },
  { id: '4', attributes: { name: 'Halo Varga', slug: 'halo-varga' } },
  { id: '5', attributes: { name: 'Jay Tripwire', slug: 'jay-tripwire' } },
  { id: '6', attributes: { name: 'Justin Marchacos', slug: 'justin-marchacos' } },
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
  { id: '26', attributes: { name: 'Sinca', slug: 'sinca' } },
  { id: '27', attributes: { name: 'N/UM', slug: 'n-um' } },
  { id: '28', attributes: { name: 'Matt Caines', slug: 'matt-caines' } },
  { id: '29', attributes: { name: 'Reza Safinia', slug: 'reza-safinia' } },
  { id: '30', attributes: { name: 'Saqib', slug: 'saqib' } },
  { id: '31', attributes: { name: 'Beauty & The Beast', slug: 'beauty-the-beast' } },
  { id: '32', attributes: { name: 'Formerly', slug: 'formerly' } },
  { id: '33', attributes: { name: 'Camea', slug: 'camea' } },
  { id: '34', attributes: { name: 'Niki Sadeki', slug: 'niki-sadeki' } }
];

const listedMixLink = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1187392201&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getPosts().then(data => setPosts(data.length > 0 ? data : samplePosts)).catch(() => setPosts(samplePosts));
    getArtists().then(data => setArtists(data.length > 0 ? data : sampleArtists)).catch(() => setArtists(sampleArtists));
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2800,
    speed: 2800,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false
  };

  const getArtistLinkColorClass = (index: number) => {
    return `artist-link-${index % 7}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <main className="Blog" style={{ marginTop: isMobile ? '60px' : '70px' }}>
      {/* Image Slider */}
      <div className="fixcenter" style={{ 
        margin: 'auto', 
        width: isMobile ? '100%' : '83%', 
        padding: '10px' 
      }}>
        <div style={{
          width: isMobile ? '100%' : '75%',
          position: 'relative',
          paddingTop: isMobile ? '56.25%' : '42.1875%',
          marginTop: isMobile ? '-56.25%' : '-42.1875%',
          marginRight: 'auto',
          marginLeft: 'auto'
        }}>
          <Slider {...sliderSettings}>
            {imageSlides.map((url, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div style={{ paddingTop: '56.25%' }}></div>
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Buzz Section */}
      <h1 className="Buzz" style={{ 
        marginTop: isMobile ? '20px' : '60px', 
        marginBottom: isMobile ? '0' : '60px' 
      }}>
        Buzz
      </h1>

      {/* Posts Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="PostSection--Grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '4rem',
            marginTop: '-60px'
          }}>
            {posts.slice(0, visiblePosts).map((post) => (
              <Link 
                key={post.id} 
                href={`/news/${post.attributes.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article className="PostCard" style={{
                  background: 'rgba(0,0,0,0.7)',
                  padding: '2rem',
                  borderRadius: '8px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {post.attributes.image?.data?.attributes?.url && (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      marginBottom: '1rem',
                      overflow: 'hidden',
                      borderRadius: '4px'
                    }}>
                      <img
                        src={post.attributes.image.data.attributes.url}
                        alt={post.attributes.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    marginBottom: '1rem',
                    color: '#ffffff' 
                  }}>
                    {post.attributes.title}
                  </h3>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    fontSize: '1.2rem',
                    marginBottom: '1rem' 
                  }}>
                    {formatDate(post.attributes.createdAt)}
                  </p>
                  <p style={{ 
                    flexGrow: 1,
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '1.4rem',
                    lineHeight: '1.6' 
                  }}>
                    {post.attributes.excerpt}
                  </p>
                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <span style={{
                      color: '#f8ec21',
                      fontSize: '1.2rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Read More →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SoundCloud Embed */}
      <div className="container-custom" style={{ marginTop: '60px' }}>
        <h1 style={{ marginBottom: '20px' }}>
          {isMobile ? 'Playlists' : 'Listed Winter Playlists'}
        </h1>
        <iframe
          title="listed-playlist"
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={listedMixLink}
          style={{ backgroundColor: 'black' }}
        />
      </div>

      {/* Artists Links */}
      <div className="home-artists-links container-custom" style={{ 
        textAlign: 'center', 
        marginTop: '60px',
        marginBottom: '60px' 
      }}>
        <h1 style={{ marginBottom: '20px' }}>Artists</h1>
        <p style={{ 
          fontFamily: "'dinBoldFont', sans-serif", 
          fontSize: '2.6rem', 
          marginLeft: isMobile ? '0' : '69px', 
          marginRight: isMobile ? '0' : '69px' 
        }}>
          {artists.map((artist, index) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.attributes.slug}`}
              className={getArtistLinkColorClass(index)}
              style={{ marginRight: '1em', textDecoration: 'none' }}
            >
              {artist.attributes.name.trim()}
            </Link>
          ))}
        </p>
      </div>

      {/* Newsletter Form (placeholder) */}
      <div
        className="ctct-inline-form"
        data-form-id="77fa4a78-f78b-4c9b-9057-b015694f8ed3"
        style={{ minHeight: '100px' }}
      />
    </main>
  );
}
