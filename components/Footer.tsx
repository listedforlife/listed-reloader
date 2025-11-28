import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '40px 20px 20px',
      marginTop: '60px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Quick Links */}
        <div>
          <h3 style={{
            fontFamily: "'dinBoldFont', sans-serif",
            fontSize: '1.8rem',
            marginBottom: '20px',
            color: '#f8ec21'
          }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              { href: '/artists', label: 'Artists' },
              { href: '/news', label: 'News' },
              { href: '/events', label: 'Events' },
              { href: '/productions', label: 'Productions' },
              { href: '/contact', label: 'Contact' }
            ].map((link) => (
              <li key={link.href} style={{ marginBottom: '10px' }}>
                <Link href={link.href} style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '1.4rem',
                  transition: 'color 0.3s ease'
                }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{
            fontFamily: "'dinBoldFont', sans-serif",
            fontSize: '1.8rem',
            marginBottom: '20px',
            color: '#f8ec21'
          }}>
            Contact
          </h3>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.4rem',
            lineHeight: '1.8'
          }}>
            San Francisco, CA<br />
            info@listedproductions.com
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 style={{
            fontFamily: "'dinBoldFont', sans-serif",
            fontSize: '1.8rem',
            marginBottom: '20px',
            color: '#f8ec21'
          }}>
            Follow Us
          </h3>
          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            {[
              { href: 'https://instagram.com', label: 'Instagram' },
              { href: 'https://soundcloud.com', label: 'SoundCloud' },
              { href: 'https://facebook.com', label: 'Facebook' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.4rem',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '20px',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '1.2rem'
        }}>
          © {currentYear} Listed Productions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
