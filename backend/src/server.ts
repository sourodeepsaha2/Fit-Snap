import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡ FitSnap Server running on http://localhost:${PORT}`);
  console.log(`🔒 Allowed CORS Client Origin: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});
