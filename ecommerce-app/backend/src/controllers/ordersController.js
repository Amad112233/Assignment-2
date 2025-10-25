import { pool } from '../db.js';

export async function createOrder(req, res) {
  const userId = req.user.id;
  const { address } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [cartItems] = await conn.query(
      `SELECT c.product_id, c.quantity, p.price
       FROM cart c JOIN products p ON p.id=c.product_id WHERE c.user_id=?`, [userId]);
    if (!cartItems.length) {
      await conn.release();
      return res.status(400).json({ message: 'Cart empty' });
    }
    const total = cartItems.reduce((s, i) => s + Number(i.price) * i.quantity, 0);
    const [orderRes] = await conn.query(
      'INSERT INTO orders (user_id, total_amount, status, address) VALUES (?,?,?,?)',
      [userId, total, 'PLACED', address || '']);
    const orderId = orderRes.insertId;
    for (const item of cartItems) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)',
        [orderId, item.product_id, item.quantity, item.price]);
    }
    await conn.query('DELETE FROM cart WHERE user_id=?', [userId]);
    await conn.commit();
    res.json({ orderId, total });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ message: 'Order failed', error: e.message });
  } finally {
    conn.release();
  }
}

export async function listOrders(req, res) {
  const userId = req.user.id;
  const [rows] = await pool.query('SELECT * FROM orders WHERE user_id=? ORDER BY order_date DESC', [userId]);
  res.json(rows);
}
