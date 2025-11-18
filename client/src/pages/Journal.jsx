import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import EntryForm from '../components/EntryForm';
import EntryCard from '../components/EntryCard';

export default function Journal() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) navigate('/auth?mode=login');
  }, [user, navigate]);

  const load = async () => {
    try {
      const { data } = await api.get('/journal');
      setEntries(data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load entries');
    }
  };

  useEffect(() => { load(); }, []);

  const add = async (form) => {
    try {
      await api.post('/journal', form);
      setMessage('Entry added');
      setEditing(null);
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add entry');
    }
  };

  const update = async (form) => {
    try {
      await api.put(`/journal/${editing.id}`, form);
      setMessage('Entry updated');
      setEditing(null);
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update entry');
    }
  };

  const remove = async (entry) => {
    if (!confirm(`Delete "${entry.title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/journal/${entry.id}`);
      setMessage('Entry deleted');
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete entry');
    }
  };

  const cancelEdit = () => setEditing(null);

  return (
    <div className="container">
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="panel" style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>{editing ? 'Edit entry' : 'Add a new entry'}</h2>
          <EntryForm
            initial={editing}
            onSubmit={editing ? update : add}
            onCancel={editing ? cancelEdit : null}
          />
          {message && <p className="label" style={{ marginTop: 8 }}>{message}</p>}
        </div>

        <div style={{ flex: 2 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ marginTop: 0 }}>Your entries</h2>
            <button className="btn ghost" onClick={load}>Refresh</button>
          </div>
          <div className="grid">
            {entries.map((e) => (
              <EntryCard key={e.id} entry={e} onEdit={setEditing} onDelete={remove} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
