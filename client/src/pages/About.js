import React from 'react';
import { motion } from 'framer-motion';

const travelQuotes = [
  "Travel is the only thing you buy that makes you richer.",
  "Life is short and the world is wide.",
  "Wherever you go becomes a part of you somehow.",
  "Travel far enough, you meet yourself.",
  "Jobs fill your pocket, but adventures fill your soul.",
];

const About = () => {
  const [currentQuote, setCurrentQuote] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % travelQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.headerSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 style={styles.title}>About TRIPPY</h1>
        <p style={styles.subtitle}>
          We blend AI with wanderlust to create personalized, unforgettable adventures.
        </p>
      </motion.div>

      <section style={styles.featuresSection}>
        <motion.div style={styles.featureBox} whileHover={{ scale: 1.05 }}>
          <h3 style={styles.featureTitle}>AI Recommendations</h3>
          <p>Smart suggestions tailored to your travel style and preferences.</p>
        </motion.div>
        <motion.div style={styles.featureBox} whileHover={{ scale: 1.05 }}>
          <h3 style={styles.featureTitle}>Customized Plans</h3>
          <p>Itineraries that match your budget, pace, and interests.</p>
        </motion.div>
        <motion.div style={styles.featureBox} whileHover={{ scale: 1.05 }}>
          <h3 style={styles.featureTitle}>Local Insights</h3>
          <p>Hidden gems and authentic experiences recommended by locals and AI.</p>
        </motion.div>
      </section>

      <section style={styles.quoteCarousel}>
        <h2 style={styles.quoteText}>
          “{travelQuotes[currentQuote]}”
        </h2>
      </section>

      <section style={styles.contactSection}>
        <h2>Contact Us</h2>
        <form style={styles.form}>
          <input type="text" placeholder="Your Name" style={styles.input} />
          <input type="email" placeholder="Your Email" style={styles.input} />
          <textarea placeholder="Your Message" rows="4" style={styles.textarea}></textarea>
          <button type="submit" style={styles.submitButton}>Send Message</button>
        </form>
      </section>

      <section style={styles.newsletterSection}>
        <h2>Join Our Travel Tribe</h2>
        <p>Subscribe for weekly travel inspiration and exclusive tips.</p>
        <form style={styles.form}>
          <input type="email" placeholder="Your Email" style={styles.input} />
          <button type="submit" style={styles.subscribeButton}>Subscribe</button>
        </form>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: '#1e88e5',
  },
  headerSection: {
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#444',
  },
  featuresSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    marginBottom: '3rem',
  },
  featureBox: {
    backgroundColor: '#f0f8ff',
    padding: '1.5rem',
    borderRadius: '10px',
    width: '260px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  featureTitle: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
  },
  quoteCarousel: {
    marginBottom: '3rem',
    backgroundColor: '#e3f2fd',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(30,136,229,0.2)',
  },
  quoteText: {
    fontSize: '1.5rem',
    fontStyle: 'italic',
    color: '#333',
  },
  contactSection: {
    marginBottom: '3rem',
    backgroundColor: '#fafafa',
    padding: '2rem',
    borderRadius: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
    maxWidth: '400px',
    marginInline: 'auto',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.8rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  submitButton: {
    padding: '0.8rem',
    borderRadius: '6px',
    backgroundColor: '#1e88e5',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  newsletterSection: {
    backgroundColor: '#1e88e5',
    color: '#fff',
    padding: '2rem',
    borderRadius: '12px',
  },
  subscribeButton: {
    padding: '0.8rem',
    borderRadius: '6px',
    backgroundColor: '#fff',
    color: '#1e88e5',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default About;
