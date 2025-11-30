'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { href: '/artists', label: 'Artists', id: 'navc1' },
    { href: '/news', label: 'News', id: 'navc2' },
    { href: '/events', label: 'Events', id: 'navc3' },
    { href: '/productions', label: 'Productions', id: 'navc4' },
    { href: '/contact', label: 'Contact', id: 'navc5' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: isMobile ? '60px' : '70px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '0 20px'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none'
        }}>
          <Image
            src="/images/logo.png"
            alt="Listed Productions"
            width={isMobile ? 40 : 50}
            height={isMobile ? 40 : 50}
            style={{ marginRight: '10px' }}
          />
          <span style={{
            fontFamily: "'dinBoldFont', sans-serif",
            fontSize: isMobile ? '1.8rem' : '2.2rem',
            color: '#ffffff',
            letterSpacing: '2px'
          }}>
            LISTED
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{
            display: 'flex',
            gap: '30px'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                id={item.id}
                style={{
                  fontFamily: "'dinFont', sans-serif",
                  fontSize: '1.6rem',
                  color: pathname === item.href ? '#f8ec21' : '#ffffff',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease',
                  position: 'relative'
                }}
              >
                {item.label}
                {pathname === item.href && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#f8ec21'
                  }} />
                )}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <span style={{
              display: 'block',
              width: '25px',
              height: '2px',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease',
              transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'none'
            }} />
            <span style={{
              display: 'block',
              width: '25px',
              height: '2px',
              backgroundColor: '#ffffff',
              opacity: isOpen ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }} />
            <span style={{
              display: 'block',
              width: '25px',
              height: '2px',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease',
              transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
            }} />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: "'dinFont', sans-serif",
                  fontSize: '1.8rem',
                  color: pathname === item.href ? '#f8ec21' : '#ffffff',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'color 0.3s ease'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
