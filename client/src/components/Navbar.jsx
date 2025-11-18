// Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="brand">Travel Journal</div>
      <div className="row">
        <Link className="btn ghost" to="/">Home</Link>
        {user ? (
          <button className="btn danger" onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link className="btn secondary" to="/auth?mode=login">Log in</Link>
            <Link className="btn" to="/auth?mode=signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
