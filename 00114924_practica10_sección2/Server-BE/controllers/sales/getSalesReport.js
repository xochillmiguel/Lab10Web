import { pool } from "../../data/connection.js";

export const getSalesReport = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.name AS customer_name, 
              SUM(s.amount) AS total_sales
       FROM sales s
       JOIN customers c ON s.id_customer = c.id
       GROUP BY c.name
       ORDER BY c.name ASC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obtaining sales report" });
  }
};
