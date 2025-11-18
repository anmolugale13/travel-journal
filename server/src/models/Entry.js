export const entryFields = [
  'id',
  'user_id',
  'title',
  'location',
  'visited_on',
  'rating',
  'notes',
  'cover_url',
  'created_at',
  'updated_at'
];

export const toPublicEntry = (row) => ({
  id: row.id,
  title: row.title,
  location: row.location,
  visited_on: row.visited_on,
  rating: row.rating,
  notes: row.notes,
  cover_url: row.cover_url,
  created_at: row.created_at,
  updated_at: row.updated_at
});
