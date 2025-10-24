import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../auth/supabase';

export function useAuth() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Error fetching user:', error);
          navigate('/login');
          return;
        }
        
        if (user) {
          setUserId(user.id);
          setProfile({
            user_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
            user_email: user.email,
            avatar_url: user.user_metadata?.avatar_url || null
          });
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setProfile(null);
      setUserId(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return { profile, userId, loading, logout };
}