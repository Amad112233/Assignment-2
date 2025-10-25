import { pool } from '../db.js';

export async function getCart(req, res) {
  const userId = req.user.id;
  const [rows] = await pool.query(
    `SELECT c.product_id, c.quantity, p.name, p.price, p.image_url
     FROM cart c JOIN products p ON p.id=c.product_id
     WHERE c.user_id=?`, [userId]);
  res.json({ items: rows });
}

export async function addToCart(req, res) {
  const userId = req.user.id;
  const { productId, quantity=1 } = req.body;
  const [rows] = await pool.query('SELECT id, quantity FROM cart WHERE user_id=? AND product_id=?', [userId, productId]);
  if (rows.length) {
    await pool.query('UPDATE cart SET quantity=? WHERE id=?', [rows[0].quantity + quantity, rows[0].id]);
  } else {
    await pool.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)', [userId, productId, quantity]);
  }
  res.json({ message: 'Added' });
}

export async function updateCartItem(req, res) {
  const userId = req.user.id;
  const { quantity } = req.body;
  const productId = req.params.productId;
  await pool.query('UPDATE cart SET quantity=? WHERE user_id=? AND product_id=?', [quantity, userId, productId]);
  res.json({ message: 'Updated' });
}

export async function removeFromCart(req, res) {
  const userId = req.user.id;
  const productId = req.params.productId;
  await pool.query('DELETE FROM cart WHERE user_id=? AND product_id=?', [userId, productId]);
  res.json({ message: 'Removed' });
}
