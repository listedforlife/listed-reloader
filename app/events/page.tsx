'use client';

import { useEffect, useState } from 'react';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Fetch events from API route
    fetch('/api/events')
      .then(res => res.json())
      .then(setEvents)
      .catch(err => {
        console.error('Failed to fetch events:', err);
        setEvents([]);
      });
  }, []);

  return (
    <div className="container-custom" style={{ marginTop: '80px' }}>
      <h1>EVENTS</h1>
      {events.length === 0 ? (
        <p style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.8)' }}>
          No upcoming events at this time.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {events.map(event => (
            <article
              key={event.id}
              style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: '1.5rem',
                borderRadius: '8px',
              }}
            >
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>
                {event.attributes.title}
              </h2>
              <p style={{ color: '#f8ec21' }}>{event.attributes.date}</p>
              <p style={{ color: '#ccc' }}>{event.attributes.venue}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
