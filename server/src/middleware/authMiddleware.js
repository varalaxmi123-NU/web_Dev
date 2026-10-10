import { supabase, isSupabaseConfigured } from '../config/supabase.js';

/**
 * Middleware to authenticate requests via Supabase JWT or Demo mode
 */
export async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const isDemoRequest = req.headers['x-demo-mode'] === 'true' || req.query.demo === 'true';

  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (isDemoRequest) {
    req.user = {
      id: 'demo-user-id',
      email: 'demo@sahaya.ai',
      full_name: 'Demo Guest User',
      isGuest: true
    };
    return next();
  }

  if (!token) {
    // Guest access allowed for demo fallback
    req.user = {
      id: 'guest-anonymous-id',
      email: 'guest@sahaya.ai',
      full_name: 'Guest User',
      isGuest: true
    };
    return next();
  }

  if (!isSupabaseConfigured || !supabase) {
    req.user = {
      id: 'demo-user-id',
      email: 'demo@sahaya.ai',
      full_name: 'Demo User',
      isGuest: true
    };
    return next();
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired authentication token. Please log in again.'
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || 'User',
      isGuest: false
    };

    next();
  } catch (err) {
    console.error('Auth verification error:', err);
    res.status(401).json({
      success: false,
      error: 'Authentication failed.'
    });
  }
}
