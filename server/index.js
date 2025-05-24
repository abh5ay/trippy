require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  console.log('GET /test called');
  res.json({ message: 'Backend is working!' });
});

app.post('/generate', async (req, res) => {
  console.log('POST /generate called');
  console.log('Request body:', req.body);

  const { destination, preferences, days } = req.body;

  if (!destination || !preferences || !Array.isArray(preferences) || !days) {
    return res.status(400).json({ error: 'Invalid input: destination, preferences array, and number of days required.' });
  }

  const prompt = `
Plan a ${days}-day travel itinerary for ${destination}, focused on:
${preferences.join(', ')}.
Include places to visit each day, short descriptions, and why it's suitable.
`;

  try {
    console.log('Calling AI API...');
    const response = await axios.post(
      'https://api.together.xyz/v1/completions',
      {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        prompt,
        max_tokens: 800,
        temperature: 0.7,
        stop: null,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (
      !response.data ||
      !response.data.choices ||
      !response.data.choices.length ||
      !response.data.choices[0].text
    ) {
      throw new Error('Invalid response from AI API');
    }

    const itinerary = response.data.choices[0].text;
    console.log('AI API response received.');
    res.json({ itinerary });
  } catch (err) {
    console.error('AI generation error:', err.response?.data || err.message || err);
    res.status(500).json({
      error: 'AI generation failed',
      details: err.response?.data || err.message || String(err),
    });
  }
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
