const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

const BASE = 'https://mon-classement-tennis.be/api';

// Recherche de joueurs par nom
app.get('/api/search-players', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    const response = await fetch(`${BASE}/search-players?q=${encodeURIComponent(q)}&limit=${limit}`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Profil complet d'un joueur par son AFT ID
app.get('/api/player/:aftId', async (req, res) => {
  try {
    const response = await fetch(`${BASE}/player/${req.params.aftId}`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Matchs d'un joueur
app.get('/api/player/:aftId/matches', async (req, res) => {
  try {
    const response = await fetch(`${BASE}/player/${req.params.aftId}/matches`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend TennisLive sur http://localhost:${PORT}`));