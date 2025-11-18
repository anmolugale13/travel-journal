import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ use global AuthContext instead of local hook

export default function AuthForm() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const mode = params.get('mode') === 'signup' ? 'signup' : 'login';
  const { login, signup, user, loading } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  // ✅ If already logged in, redirect immediately
  useEffect(() => {
    if (user) navigate('/journal');
  }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'login') {
      const res = await login(form.email, form.password);
      if (!res.ok) setError(res.error);
    } else {
      const res = await signup(form.name, form.email, form.password);
      if (!res.ok) setError(res.error);
    }
  };

  // ✅ If user is logged in, don’t render the form
  if (user) {
    return (
      <div className="container">
        <div className="panel" style={{ maxWidth: 480, margin: '40px auto' }}>
          <h2>You are already logged in</h2>
          <p className="label">Redirecting to your journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="panel" style={{ maxWidth: 480, margin: '40px auto' }}>
        <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        <p className="label">
          {mode === 'login'
            ? 'Log in to continue to your travel memories.'
            : 'Sign up to start your travel journal.'}
        </p>

        <form onSubmit={submit}>
          {mode === 'signup' && (
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          )}
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {error && (
            <div className="panel" style={{ background: '#1a1f2e', borderColor: '#433c5b' }}>
              {error}
            </div>
          )}

          <div className="row" style={{ justifyContent: 'space-between', marginTop: 12 }}>
            <button className="btn" disabled={loading}>
              {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}
            </button>
            <button
              className="btn ghost"
              type="button"
              onClick={() => navigate(`/auth?mode=${mode === 'login' ? 'signup' : 'login'}`)}
            >
              {mode === 'login' ? 'Need an account?' : 'Have an account? Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
