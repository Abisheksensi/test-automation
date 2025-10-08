// server/mockServer.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'testuser' && password === 'password123') {
    return res.status(200).json({ token: 'mocked-jwt-token', message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/api/items', (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer mocked-jwt-token') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  const { name, price } = req.body;
  if (!name || price === undefined) return res.status(400).json({ message: 'Missing item data' });

  return res.status(201).json({ id: Math.floor(Math.random() * 10000), name, price });
});

// start only if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Mock API running on http://localhost:${PORT}`));
}

module.exports = app;
