import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * GET /api/auth/me
 * Returns profile information for the authenticated user
 */
router.get('/me', authenticateToken, (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Not authenticated'
    });
  }

  return res.status(200).json({
    success: true,
    user: req.user
  });
});

export default router;
