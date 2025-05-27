import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const travelDestinations = [
  {
    src: "https://studyinginswitzerland.com/wp-content/uploads/2022/04/feature-picture-14-e1650796908612.jpg",
    label: "Lauterbrunnen, Switzerland",
  },
  {
    src: "https://i.redd.it/zplkig9o86m61.jpg",
    label: "Mount Fuji, Japan",
  },
  {
    src: "https://www.parlourx.com/cdn/shop/articles/VeniceHero.jpg?v=1578639648",
    label: "Venice, Italy",
  },
  {
    src: "https://citynomads.com/wp-content/uploads/2020/06/santorini-greece-coverimage.jpg",
    label: "Santorini, Greece",
  },
  {
    src: "https://www.agoda.com/wp-content/uploads/2024/12/Bali-featured-1244x700.jpg",
    label: "Bali, Indonesia",
  },
  {
    src: "https://images.fineartamerica.com/images-medium-large-5/1-skogafoss-waterfall-tony-craddock.jpg",
    label: "Skógafoss, Iceland",
  },
  {
    src: "https://www.metropolitan-touring.com/wp-content/uploads/2023/04/machu-picchu-peru-1.webp",
    label: "Machu Picchu, Peru",
  },
  {
    src: "https://i.pinimg.com/564x/22/0a/bd/220abda85ca9b20766c7ca53d357f2a3.jpg",
    label: "Grand Canyon, USA",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!document.getElementById('scrollLeftStyles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'scrollLeftStyles';
      styleTag.innerHTML = `
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-310px * 8)); }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Discover Your Next Adventure</h1>
        <p style={styles.heroSubtitle}>Plan personalized trips with the power of AI.</p>
        <button style={styles.heroButton} onClick={() => navigate('/recommend')}>
          Get Started
        </button>
      </section>

      <section
        style={styles.imageSliderSection}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            ...styles.sliderTrack,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {travelDestinations.concat(travelDestinations).map((item, index) => (
            <div key={index} style={styles.imageWithLabel}>
              <img
                src={item.src}
                alt={item.label}
                style={styles.sliderImage}
                draggable={false}
                onClick={() => setModalImage(item)}
              />
              <div style={styles.caption}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {modalImage && (
        <div style={styles.modalOverlay} onClick={() => setModalImage(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={modalImage.src} alt={modalImage.label} style={styles.modalImage} />
            <p style={styles.modalCaption}>{modalImage.label}</p>
            <button style={styles.closeButton} onClick={() => setModalImage(null)}>Close</button>
          </div>
        </div>
      )}

      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Choose TRIPPY?</h2>
        <div style={styles.features}>
          <div style={styles.featureBox}>
            <h3 style={styles.featureTitle}>AI-Powered Planning</h3>
            <p>Get smart recommendations based on your interests and travel history.</p>
          </div>
          <div style={styles.featureBox}>
            <h3 style={styles.featureTitle}>Custom Itineraries</h3>
            <p>Receive day-by-day plans tailored for your trip duration and budget.</p>
          </div>
          <div style={styles.featureBox}>
            <h3 style={styles.featureTitle}>Handpicked Experiences</h3>
            <p>Explore local gems, food spots, and unique activities curated for you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', textAlign: 'center' },
  hero: {
    backgroundColor: '#e3f2fd',
    padding: '4rem 2rem',
    borderRadius: '12px',
    marginBottom: '3rem',
    boxShadow: '0 8px 16px rgba(30,136,229,0.2)',
  },
  heroTitle: { fontSize: '2.5rem', marginBottom: '1rem', color: '#1e88e5' },
  heroSubtitle: { fontSize: '1.2rem', marginBottom: '2rem', color: '#333' },
  heroButton: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#1e88e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  imageSliderSection: {
    overflow: 'hidden',
    width: '100%',
    marginBottom: '3rem',
    cursor: 'pointer',
  },
  sliderTrack: {
    display: 'flex',
    width: 'calc(310px * 16)',
    animation: 'scrollLeft 40s linear infinite',
  },
  imageWithLabel: {
    width: 300,
    marginRight: 10,
    textAlign: 'center',
  },
  sliderImage: {
    width: 300,
    height: 200,
    objectFit: 'cover',
    borderRadius: 12,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    userSelect: 'none',
    transition: 'transform 0.3s ease',
  },
  caption: {
    fontSize: '0.9rem',
    color: '#555',
    marginTop: '0.5rem',
  },
  featuresSection: { padding: '1rem' },
  sectionTitle: { fontSize: '2rem', marginBottom: '2rem', color: '#1e88e5' },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '1.5rem',
  },
  featureBox: {
    width: '280px',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  featureTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#1e88e5',
  },

  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '90%',
    maxHeight: '90%',
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '1rem',
  },
  modalCaption: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#1e88e5',
  },
  closeButton: {
    padding: '8px 16px',
    backgroundColor: '#1e88e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Home;
