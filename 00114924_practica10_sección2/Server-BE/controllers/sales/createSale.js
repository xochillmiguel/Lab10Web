import { pool } from "../../data/connection.js";

export const createSale = async (req, res) => {
  const { amount, id_customer } = req.body;

  try {
    const exists = await pool.query(
      "SELECT * FROM customers WHERE id = $1",
      [id_customer]
    );

    if (exists.rows.length === 0)
      return res.status(400).json({ message: "Customer does not exist" });

    const insert = await pool.query(
      "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING *",
      [amount, id_customer]
    );

    return res.status(201).json({
      message: "Sale registered successfully",
      sale: insert.rows[0],
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
