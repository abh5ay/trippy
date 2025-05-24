import React, { useState } from 'react';

function App() {
  const [destination, setDestination] = useState('');
  const [preferences, setPreferences] = useState('');
  const [days, setDays] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

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
      console.error('Fetch error:', error);
      setItinerary('Something went wrong: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>TRIPPY</h2>

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Preferences (comma-separated)"
        value={preferences}
        onChange={e => setPreferences(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Number of Days"
        value={days}
        onChange={e => setDays(e.target.value)}
        style={styles.input}
        min="1"
      />

      <button
        onClick={generateItinerary}
        disabled={loading || !destination.trim() || !days}
        style={{
          ...styles.button,
          ...(loading || !destination.trim() || !days ? styles.buttonDisabled : {}),
        }}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {itinerary && (
        <div style={styles.resultBox}>
          <h3> Your Itinerary:</h3>
          <pre style={styles.itineraryText}>{itinerary}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '3rem auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    marginBottom: 24,
    color: '#1e88e5',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    margin: '8px 0',
    borderRadius: 8,
    border: '1.5px solid #ccc',
    fontSize: 16,
    boxSizing: 'border-box',
  },
  button: {
    marginTop: 12,
    padding: '12px 30px',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#1e88e5',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
    cursor: 'not-allowed',
  },
  resultBox: {
    marginTop: 24,
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: 10,
    boxShadow: 'inset 0 0 10px #bbdefb',
    textAlign: 'left',
    maxHeight: 400,
    overflowY: 'auto',
  },
  itineraryText: {
    whiteSpace: 'pre-wrap',
    fontSize: 15,
    lineHeight: 1.5,
    color: '#333',
  },
};

export default App;
