import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <div className="panel" style={{ marginTop: 24 }}>
        <h1 style={{ marginTop: 0 }}>Capture your journeys</h1>
        <p className="label">
          Simple, elegant travel journaling. Log places, dates, ratings, and notes — your memories, beautifully organized.
        </p>
        <div className="row">
          <Link className="btn" to="/auth?mode=signup">Get started</Link>
          <Link className="btn ghost" to="/auth?mode=login">I already have an account</Link>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h3 style={{ marginTop: 0 }}>Why Travel Journal?</h3>
        <ul>
          <li>• Clean UI with dark aesthetic</li>
          <li>• Fast and secure with JWT auth</li>
          <li>• Your entries stored in MySQL</li>
        </ul>
      </div>

      <div className="footer">Made with Node.js, React, and MySQL</div>
    </div>
  );
}
