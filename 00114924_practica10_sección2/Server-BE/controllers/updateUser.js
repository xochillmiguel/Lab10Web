import { pool } from '../data/connection.js';

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    await pool.query('UPDATE users SET name=$1, email=$2 WHERE id=$3', 
    [name, email, id,]);
    res.status(200).json({ message: `User modified with ID: ${id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
