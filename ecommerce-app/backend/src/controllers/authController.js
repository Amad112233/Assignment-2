import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { name, email, password, address='', phone='' } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' });
  const [exists] = await pool.query('SELECT id FROM users WHERE email=?', [email]);
  if (exists.length) return res.status(409).json({ message: 'Email already registered' });
  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query('INSERT INTO users (name, email, password, address, phone) VALUES (?,?,?,?,?)',
    [name, email, hash, address, phone]);
  const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
  if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token });
}
