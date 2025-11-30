export default function ContactPage() {
  return (
    <div className="container-custom" style={{ marginTop: '80px' }}>
      <h1>CONTACT</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px'
      }}>
        <div>
          <h2 style={{ marginBottom: '20px' }}>Get in Touch</h2>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.8', marginBottom: '30px' }}>
            For bookings, events, and general inquiries, please reach out to us.
          </p>
          <p style={{ fontSize: '1.6rem', marginBottom: '10px' }}>
            <strong>Email:</strong> info@listedproductions.com
          </p>
          <p style={{ fontSize: '1.6rem', marginBottom: '10px' }}>
            <strong>Location:</strong> San Francisco, CA
          </p>
        </div>
        <div>
          <h2 style={{ marginBottom: '20px' }}>Follow Us</h2>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.8' }}>
            Stay connected with Listed Productions on social media for the latest updates, events, and releases.
          </p>
        </div>
      </div>
    </div>
  );
}
