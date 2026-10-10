import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);

  useEffect(() => {
    // Check saved session
    const savedUser = localStorage.getItem('sahaya_user');
    const savedGuest = localStorage.getItem('sahaya_guest_mode') === 'true';

    if (savedGuest && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsGuestMode(true);
      } catch (e) {}
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          setIsGuestMode(false);
          syncProfile(session.user);
        }
        setLoading(false);
      }).catch((err) => {
        console.warn('Supabase getSession error:', err);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          setIsGuestMode(false);
          syncProfile(session.user);
        } else if (_event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setIsGuestMode(false);
          localStorage.removeItem('sahaya_user');
          localStorage.removeItem('sahaya_guest_mode');
        }
        setLoading(false);
      });

      return () => subscription?.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const syncProfile = async (userData) => {
    if (!supabase || !userData) return;
    try {
      await supabase.from('profiles').upsert({
        id: userData.id,
        full_name: userData.user_metadata?.full_name || userData.email?.split('@')[0] || 'User',
        email: userData.email,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Supabase profile sync warning:', err);
    }
  };

  const enableGuestMode = () => {
    const guestUser = {
      id: 'guest-user-id',
      email: 'guest@sahaya.ai',
      user_metadata: { full_name: 'Hackathon Guest' },
      isGuest: true
    };
    setUser(guestUser);
    setIsGuestMode(true);
    localStorage.setItem('sahaya_user', JSON.stringify(guestUser));
    localStorage.setItem('sahaya_guest_mode', 'true');
    return guestUser;
  };

  const signup = async (fullName, email, password) => {
    let createdUser = {
      id: 'user-' + Date.now(),
      email,
      user_metadata: { full_name: fullName || email.split('@')[0] }
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });

        if (!error && data?.user) {
          createdUser = data.user;
          if (data.session) setSession(data.session);
          await syncProfile(data.user);
        }
      } catch (err) {
        console.warn('Supabase signUp notice:', err.message);
      }
    }

    setUser(createdUser);
    setIsGuestMode(false);
    localStorage.setItem('sahaya_user', JSON.stringify(createdUser));
    localStorage.removeItem('sahaya_guest_mode');
    return { user: createdUser, requireConfirmation: false };
  };

  const login = async (email, password) => {
    let loggedInUser = {
      id: 'user-' + Date.now(),
      email,
      user_metadata: { full_name: email.split('@')[0] }
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data?.user) {
          loggedInUser = data.user;
          setSession(data.session);
          await syncProfile(data.user);
        }
      } catch (err) {
        console.warn('Supabase signIn notice:', err.message);
      }
    }

    setUser(loggedInUser);
    setIsGuestMode(false);
    localStorage.setItem('sahaya_user', JSON.stringify(loggedInUser));
    localStorage.removeItem('sahaya_guest_mode');
    return { user: loggedInUser };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    setUser(null);
    setSession(null);
    setIsGuestMode(false);
    localStorage.removeItem('sahaya_user');
    localStorage.removeItem('sahaya_guest_mode');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isGuestMode,
        isSupabaseConfigured,
        login,
        signup,
        logout,
        enableGuestMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
