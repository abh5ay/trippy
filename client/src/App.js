import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import Recommend from './pages/Recommend';

function App() {
  const [hovered, setHovered] = useState(null);

  const getLinkStyle = (linkName) => ({
    fontSize: '1.25rem',
    cursor: 'pointer',
    paddingBottom: '6px',
    borderBottom: hovered === linkName ? '3px solid #ffca28' : '3px solid transparent',
    color: hovered === linkName ? '#ffca28' : 'white',
    transition: 'color 0.25s ease, border-bottom 0.25s ease',
    textDecoration: 'none',
    userSelect: 'none',
    fontWeight: '600',
  });

  return (
    <Router>
      <div style={styles.wrapper}>
        <nav style={styles.navbar}>
          <h1 style={styles.logo}>TRIPPY</h1>
          <ul style={styles.navLinks}>
            <li>
              <Link
                to="/"
                style={getLinkStyle('home')}
                onMouseEnter={() => setHovered('home')}
                onMouseLeave={() => setHovered(null)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={getLinkStyle('about')}
                onMouseEnter={() => setHovered('about')}
                onMouseLeave={() => setHovered(null)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/packages"
                style={getLinkStyle('packages')}
                onMouseEnter={() => setHovered('packages')}
                onMouseLeave={() => setHovered(null)}
              >
                Packages
              </Link>
            </li>
            <li>
              <Link
                to="/recommend"
                style={getLinkStyle('recommend')}
                onMouseEnter={() => setHovered('recommend')}
                onMouseLeave={() => setHovered(null)}
              >
                Recommend
              </Link>
            </li>
          </ul>
        </nav>

        <div style={styles.page}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/recommend" element={<Recommend />} />
          </Routes>
        </div>

        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerLinks}>
              <Link to="/" style={styles.footerLink}>Home</Link>
              <Link to="/about" style={styles.footerLink}>About</Link>
              <Link to="/packages" style={styles.footerLink}>Packages</Link>
              <Link to="/recommend" style={styles.footerLink}>Recommend</Link>
            </div>

            <div style={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Facebook">📘</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Twitter">🐦</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Instagram">📸</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="LinkedIn">🔗</a>
            </div>
          </div>

          <p style={{ marginTop: 12 }}>
            © {new Date().getFullYear()} TRIPPY — Explore the world with us 🌍✈️
          </p>
        </footer>
      </div>
    </Router>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9fbfd',
  },
  navbar: {
    height: '8vh',
    backgroundColor: '#1976d2',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2.5rem',
    marginBottom: '1rem',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    fontWeight: '600',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '3px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '2.5rem',
    margin: 0,
    padding: 0,
  },
  page: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: '2rem',
  },
  footer: {
    backgroundColor: '#1976d2',
    color: 'white',
    textAlign: 'center',
    padding: '1.5rem 2rem 2rem',
    fontWeight: '500',
    fontSize: '1rem',
    userSelect: 'none',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 900,
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  footerLinks: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#ffca28',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  socialIcons: {
    display: 'flex',
    gap: '1rem',
    fontSize: '1.5rem',
  },
  socialLink: {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
};

export default App;
