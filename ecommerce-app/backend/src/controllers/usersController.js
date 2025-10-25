import { pool } from '../db.js';

export async function me(req, res) {
  const userId = req.user.id;
  const [rows] = await pool.query('SELECT id, name, email, address, phone FROM users WHERE id=?', [userId]);
  res.json(rows[0]);
}

export async function updateMe(req, res) {
  const userId = req.user.id;
  const { name, address } = req.body;
  await pool.query('UPDATE users SET name=?, address=? WHERE id=?', [name, address, userId]);
  const [rows] = await pool.query('SELECT id, name, email, address, phone FROM users WHERE id=?', [userId]);
  res.json(rows[0]);
}
