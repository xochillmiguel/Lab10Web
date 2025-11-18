import { pool } from "../../data/connection.js";

export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers;");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
