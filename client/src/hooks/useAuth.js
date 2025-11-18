import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('tj_user');
    return raw ? JSON.parse(raw) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('tj_token'));
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('tj_token', data.token);
      localStorage.setItem('tj_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('tj_token', data.token);
      localStorage.setItem('tj_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.message || 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('tj_token');
    localStorage.removeItem('tj_user');
    setToken(null);
    setUser(null);
  };

  return { user, token, loading, login, signup, logout };
}
