export default function EntryCard({ entry, onEdit, onDelete }) {
  const fallback = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop';
  return (
    <div className="card">
      <img src={entry.cover_url || fallback} alt={entry.title} />
      <div className="card-body">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <strong>{entry.title}</strong>
          {entry.rating ? <span className="label">★ {entry.rating}/5</span> : <span className="label">No rating</span>}
        </div>
        <div className="label">{entry.location || 'Unknown location'}</div>
        <div className="label">Visited: {entry.visited_on || '—'}</div>
        <p style={{ margin: 0 }}>{entry.notes || 'No notes yet.'}</p>
        <div className="row" style={{ marginTop: 8, justifyContent: 'flex-end' }}>
          <button className="btn ghost" onClick={() => onEdit(entry)}>Edit</button>
          <button className="btn danger" onClick={() => onDelete(entry)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
