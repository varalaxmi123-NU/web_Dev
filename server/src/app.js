import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health.js';
import documentsRouter from './routes/documents.js';
import authRouter from './routes/auth.js';

const app = express();

// Enable CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// Body Parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// API Routes
app.use('/api', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/documents', documentsRouter);

// Centralized 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `API route not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'An unexpected server error occurred.'
  });
});

export default app;
