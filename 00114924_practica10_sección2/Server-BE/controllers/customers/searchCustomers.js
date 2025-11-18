import { pool } from "../../data/connection.js";

export const searchCustomers = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: "Code query param is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM customers WHERE code = $1",
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json(result.rows[0]); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
