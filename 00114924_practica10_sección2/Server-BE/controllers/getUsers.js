import { pool } from "../data/connection.js";

export const getUsers = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
