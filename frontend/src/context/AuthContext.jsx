import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('cgxp_token'));
  const [loading, setLoading] = useState(true);

  // On mount, try to restore user from token
  useEffect(() => {
    const restoreUser = async () => {
      const savedToken = localStorage.getItem('cgxp_token');
      if (!savedToken) { setLoading(false); return; }
      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        setUser(res.data);
        setToken(savedToken);
      } catch {
        localStorage.removeItem('cgxp_token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    restoreUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { accessToken, ...userData } = res.data;
    localStorage.setItem('cgxp_token', accessToken);
    setToken(accessToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('cgxp_token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
