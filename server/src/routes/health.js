import express from 'express';
import { isSupabaseConfigured } from '../config/supabase.js';
import { isAiConfigured } from '../services/aiService.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'SAHAYA AI Server',
    timestamp: new Date().toISOString(),
    services: {
      database: isSupabaseConfigured ? 'connected (Supabase PostgreSQL)' : 'demo_mode (Missing credentials)',
      ai_engine: isAiConfigured ? 'connected (Gemini API)' : 'demo_mode (Sample AI analysis)'
    }
  });
});

export default router;
