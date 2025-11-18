import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isEmail, isNonEmpty } from '../utils/validate.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!isNonEmpty(name) || !isEmail(email) || !isNonEmpty(password)) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const [existing] = await pool.query('SELECT id FROM users WHERE email=?', [email]);
    if (existing.length) return res.status(409).json({ message: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name.trim(), email.toLowerCase(), password_hash]
    );

    const userId = result.insertId;
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({ token, user: { id: userId, name, email } });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isEmail(email) || !isNonEmpty(password)) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email.toLowerCase()]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
