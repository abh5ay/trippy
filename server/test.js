const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  console.log('GET /test called');
  res.send('Server is working!');
});

app.listen(5000, () => console.log('Server running on port 5000'));
