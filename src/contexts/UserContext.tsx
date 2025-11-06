import { supabase } from '../lib/supabase';
import { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  user: any;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      // Get current session (this includes user info if logged in)
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData?.session?.user) {
        setUser(sessionData.session.user);
      } else {
        setUser(null);
      }

      setLoading(false); // ✅ Make sure to stop loading after fetching session
    };

    checkUser();

    // Listen for auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
