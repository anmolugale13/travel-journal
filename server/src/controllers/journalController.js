import pool from '../config/db.js';
import { clampRating } from '../utils/validate.js';
import { toPublicEntry } from '../models/Entry.js';

export const listEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query('SELECT * FROM entries WHERE user_id=? ORDER BY visited_on DESC, created_at DESC', [userId]);
    return res.json(rows.map(toPublicEntry));
  } catch (err) {
    console.error('List entries error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, location, visited_on, rating, notes, cover_url } = req.body;

    if (!title || !title.trim()) return res.status(400).json({ message: 'Title is required' });

    const safeRating = clampRating(rating);
    const [result] = await pool.query(
      `INSERT INTO entries (user_id, title, location, visited_on, rating, notes, cover_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        title.trim(),
        location ? location.trim() : null,
        visited_on || null,
        safeRating,
        notes || null,
        cover_url || null
      ]
    );
    const [rows] = await pool.query('SELECT * FROM entries WHERE id=?', [result.insertId]);
    return res.status(201).json(toPublicEntry(rows[0]));
  } catch (err) {
    console.error('Create entry error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const entryId = req.params.id;
    const { title, location, visited_on, rating, notes, cover_url } = req.body;

    const [rows] = await pool.query('SELECT * FROM entries WHERE id=? AND user_id=?', [entryId, userId]);
    if (!rows.length) return res.status(404).json({ message: 'Entry not found' });

    const safeRating = clampRating(rating);

    await pool.query(
      `UPDATE entries SET title=?, location=?, visited_on=?, rating=?, notes=?, cover_url=? WHERE id=? AND user_id=?`,
      [
        title && title.trim() ? title.trim() : rows[0].title,
        location != null ? location.trim() : rows[0].location,
        visited_on != null ? visited_on : rows[0].visited_on,
        safeRating != null ? safeRating : rows[0].rating,
        notes != null ? notes : rows[0].notes,
        cover_url != null ? cover_url : rows[0].cover_url,
        entryId,
        userId
      ]
    );
    const [updated] = await pool.query('SELECT * FROM entries WHERE id=? AND user_id=?', [entryId, userId]);
    return res.json(toPublicEntry(updated[0]));
  } catch (err) {
    console.error('Update entry error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const entryId = req.params.id;
    const [rows] = await pool.query('SELECT id FROM entries WHERE id=? AND user_id=?', [entryId, userId]);
    if (!rows.length) return res.status(404).json({ message: 'Entry not found' });

    await pool.query('DELETE FROM entries WHERE id=? AND user_id=?', [entryId, userId]);
    return res.json({ message: 'Entry deleted' });
  } catch (err) {
    console.error('Delete entry error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
