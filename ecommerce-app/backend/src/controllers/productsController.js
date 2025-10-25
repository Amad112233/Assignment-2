import { pool } from '../db.js';

export async function listProducts(req, res) {
  const { category, q } = req.query;
  let sql = 'SELECT * FROM products';
  const params = [];
  const where = [];
  if (category) { where.push('category = ?'); params.push(category); }
  if (q) { where.push('name LIKE ?'); params.push(`%${q}%`); }
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  const [rows] = await pool.query(sql, params);
  res.json(rows);
}

export async function getProduct(req, res) {
  const [rows] = await pool.query('SELECT * FROM products WHERE id=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
}

export async function listCategories(req, res) {
  const [rows] = await pool.query('SELECT DISTINCT category FROM products');
  res.json(rows.map(r => r.category).filter(Boolean));
}
