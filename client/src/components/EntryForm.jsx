import { useState, useEffect } from 'react';

export default function EntryForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    location: '',
    visited_on: '',
    rating: '',
    notes: '',
    cover_url: ''
  });

  // ✅ Sync form whenever initial changes
  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        location: initial.location || '',
        visited_on: initial.visited_on || '',
        rating: initial.rating || '',
        notes: initial.notes || '',
        cover_url: initial.cover_url || ''
      });
    } else {
      setForm({
        title: '',
        location: '',
        visited_on: '',
        rating: '',
        notes: '',
        cover_url: ''
      });
    }
  }, [initial]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <div className="row">
        <div style={{ flex: 2 }}>
          <label className="label">Title</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="label">Visited on</label>
          <input
            className="input"
            type="date"
            value={form.visited_on}
            onChange={(e) => setForm({ ...form, visited_on: e.target.value })}
          />
        </div>
        <div style={{ width: 100 }}>
          <label className="label">Rating (1-5)</label>
          <input
            className="input"
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />
        </div>
      </div>

      <div className="row">
        <div style={{ flex: 1 }}>
          <label className="label">Location</label>
          <input
            className="input"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="label">Cover image URL</label>
          <input
            className="input"
            placeholder="https://…"
            value={form.cover_url}
            onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Notes</label>
        <textarea
          className="input"
          rows="4"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      <div className="row" style={{ justifyContent: 'flex-end' }}>
        {onCancel && (
          <button
            type="button"
            className="btn ghost"
            onClick={onCancel}
            style={{ marginRight: 8 }}
          >
            Cancel
          </button>
        )}
        <button className="btn">{initial ? 'Update entry' : 'Add entry'}</button>
      </div>
    </form>
  );
}
