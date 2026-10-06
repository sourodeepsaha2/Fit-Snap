import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mealRoutes from './routes/mealRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import waterRoutes from './routes/waterRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck Endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'FitSnap Backend' });
});

// API Routes
app.use('/api/meals', mealRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/water', waterRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
