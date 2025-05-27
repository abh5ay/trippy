import React, { useState } from 'react';
import { motion } from 'framer-motion';

const travelPackages = [
  {
    title: "Romantic Europe Escape",
    description: "10 days through Paris, Venice, and Santorini. Perfect for couples.",
    price: 249999,
    image: "https://elitevoyage.com/wp-content/uploads/2024/02/couple_travel-scaled-e1707475343467.jpg",
  },
  {
    title: "Adventure in the Alps",
    description: "Skiing, hiking, and cozy chalets in the Swiss Alps.",
    price: 189999,
    image: "https://holidays.tripfactory.com/blogs/wp-content/uploads/sites/6/2024/06/Ziplining.webp",
  },
  {
    title: "Tropical Bali Bliss",
    description: "7 nights in Bali with private villas, yoga, and beach clubs.",
    price: 129999,
    image: "https://www.phurr.in/uploaded_files/prodimages/gallery_2f60c10.jpg",
  },
  {
    title: "Mystic Japan Explorer",
    description: "Tokyo, Kyoto, and Mt. Fuji in a 9-day cultural experience.",
    price: 199999,
    image: "https://untappedkumamoto.com/wp-content/uploads/2020/06/IMG_2227-2-1024x668.jpeg",
  },
];

const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

const Packages = () => {
  const [modalData, setModalData] = useState(null);
  const [maxPrice, setMaxPrice] = useState(250000);

  const filteredPackages = travelPackages.filter(pkg => pkg.price <= maxPrice);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Exclusive Travel Packages</h2>
      <p style={styles.subheading}>
        Handpicked experiences curated by our AI and travel experts
      </p>

      <div style={styles.filterSection}>
        <label style={styles.filterLabel}>Max Budget: {formatPrice(maxPrice)}</label>
        <input
          type="range"
          min="50000"
          max="250000"
          step="5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          style={styles.slider}
        />
      </div>

      <div style={styles.packageGrid}>
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={index}
            style={styles.card}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setModalData(pkg)}
          >
            <img src={pkg.image} alt={pkg.title} style={styles.image} />
            <div style={styles.cardContent}>
              <h3 style={styles.title}>{pkg.title}</h3>
              <p style={styles.description}>{pkg.description}</p>
              <p style={styles.price}>{formatPrice(pkg.price)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {modalData && (
        <div style={styles.modalOverlay} onClick={() => setModalData(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.title}>{modalData.title}</h3>
            <p style={styles.description}>{modalData.description}</p>
            <p style={styles.price}>{formatPrice(modalData.price)}</p>
            <form style={styles.form}>
              <input type="text" placeholder="Your Name" required style={styles.input} />
              <input type="email" placeholder="Email Address" required style={styles.input} />
              <input type="tel" placeholder="Phone Number" required style={styles.input} />
              <button type="submit" style={styles.button}>Submit Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#f9f9f9' },
  heading: { fontSize: '2.5rem', color: '#1e88e5', marginBottom: '0.5rem' },
  subheading: { fontSize: '1.1rem', color: '#555', marginBottom: '2rem' },
  filterSection: { marginBottom: '2rem' },
  filterLabel: { fontSize: '1rem', marginRight: '1rem' },
  slider: { width: '300px' },
  packageGrid: { display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' },
  card: {
    width: '280px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column', cursor: 'pointer',
  },
  image: { width: '100%', height: '180px', objectFit: 'cover' },
  cardContent: { padding: '1rem', flexGrow: 1 },
  title: { fontSize: '1.2rem', color: '#1e88e5', marginBottom: '0.5rem' },
  description: { fontSize: '0.95rem', color: '#333', marginBottom: '1rem' },
  price: { fontSize: '1.1rem', color: '#4caf50', fontWeight: 'bold', marginBottom: '1rem' },
  button: {
    padding: '10px 16px', backgroundColor: '#1e88e5', color: '#fff', border: 'none',
    borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem',
  },
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', maxWidth: '90%', maxHeight: '90%',
    textAlign: 'center', overflowY: 'auto', boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' },
  input: {
    padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem', width: '100%',
  },
};

export default Packages;