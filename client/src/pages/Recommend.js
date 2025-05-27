import React, { useState } from 'react';

export default function Recommend() {
  const [destination, setDestination] = useState('');
  const [preferences, setPreferences] = useState('');
  const [days, setDays] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

  // Track focus states for inputs to apply focus styles
  const [isFocused, setIsFocused] = useState({
    destination: false,
    preferences: false,
    days: false,
  });

  // Track hover state on the button for hover styling
  const [btnHover, setBtnHover] = useState(false);

  const generateItinerary = async () => {
    setLoading(true);
    setItinerary('');

    try {
      const response = await fetch('http://localhost:5050/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          preferences: preferences.split(',').map(s => s.trim()),
          days: Number(days),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setItinerary(`Error: ${data.error || 'Unknown error occurred'}`);
      } else {
        setItinerary(data.itinerary || 'No itinerary returned.');
      }
    } catch (error) {
      setItinerary('Something went wrong: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.content}>
      <h2 style={styles.heading}>Plan Your Trip</h2>

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        style={{
          ...styles.input,
          ...(isFocused.destination ? styles.inputFocus : {}),
        }}
        onFocus={() => setIsFocused({ ...isFocused, destination: true })}
        onBlur={() => setIsFocused({ ...isFocused, destination: false })}
      />

      <input
        type="text"
        placeholder="Preferences (comma-separated)"
        value={preferences}
        onChange={e => setPreferences(e.target.value)}
        style={{
          ...styles.input,
          ...(isFocused.preferences ? styles.inputFocus : {}),
        }}
        onFocus={() => setIsFocused({ ...isFocused, preferences: true })}
        onBlur={() => setIsFocused({ ...isFocused, preferences: false })}
      />

      <input
        type="number"
        placeholder="Number of Days"
        value={days}
        onChange={e => setDays(e.target.value)}
        style={{
          ...styles.input,
          ...(isFocused.days ? styles.inputFocus : {}),
        }}
        min="1"
        onFocus={() => setIsFocused({ ...isFocused, days: true })}
        onBlur={() => setIsFocused({ ...isFocused, days: false })}
      />

      <button
        onClick={generateItinerary}
        disabled={loading || !destination.trim() || !days}
        style={{
          ...styles.button,
          ...(loading || !destination.trim() || !days ? styles.buttonDisabled : {}),
          ...(btnHover && !(loading || !destination.trim() || !days) ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {itinerary && (
        <div style={styles.resultBox}>
          <h3>Your Itinerary:</h3>
          <pre style={styles.itineraryText}>{itinerary}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  content: {
    height: '100vh', // full viewport height
    maxWidth: 600,
    margin: '0 auto',
    padding: '2.5rem 2rem',
    background: 'linear-gradient(135deg, #a2d9ff 0%, #ffffff 100%)', // soft sky blue gradient
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0, 96, 170, 0.2)', // soft blue shadow
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    marginBottom: 28,
    color: '#0b3d91', // deep blue, friendly & bold
    fontWeight: '700',
    fontSize: '2rem',
    letterSpacing: '1px',
    textShadow: '1px 1px 2px rgba(11, 61, 145, 0.3)',
  },
  input: {
    width: '100%',
    padding: '14px 20px',
    margin: '10px 0',
    borderRadius: 12,
    border: '1.5px solid #a2d9ff',
    fontSize: 17,
    fontWeight: '500',
    color: '#054a91',
    boxShadow: 'inset 0 2px 6px rgba(162, 217, 255, 0.6)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
  },
  inputFocus: {
    borderColor: '#0b3d91',
    boxShadow: '0 0 8px #0b3d91',
    outline: 'none',
  },
  button: {
    marginTop: 20,
    padding: '14px 36px',
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#0b3d91',
    border: 'none',
    borderRadius: 16,
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(11, 61, 145, 0.5)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#08306b',
    boxShadow: '0 8px 25px rgba(8, 48, 107, 0.8)',
  },
  buttonDisabled: {
    backgroundColor: '#9ec7ff',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  resultBox: {
    marginTop: 32,
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: 20,
    boxShadow: 'inset 0 0 20px #cfe6ff',
    textAlign: 'left',
    flexGrow: 1,
    overflowY: 'auto',
    minHeight: 0,
    fontSize: 16,
    lineHeight: 1.6,
    color: '#054a91',
    fontWeight: '500',
  },
  itineraryText: {
    whiteSpace: 'pre-wrap',
  },
};
