import { pool } from "../../data/connection.js";

export const getSales = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.id, s.amount, s.created_at, c.name AS customer_name
       FROM sales s
       JOIN customers c ON s.id_customer = c.id
       ORDER BY s.id ASC`
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obtaining sales" });
  }
};
