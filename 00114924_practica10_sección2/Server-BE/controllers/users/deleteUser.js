import { pool } from '../../data/connection.js';

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.status(200).json({ message: `User deleted with ID: ${id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};