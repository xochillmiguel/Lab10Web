import { pool } from "../../data/connection.js";
import { JWT_SECRET } from "../../keys/keys.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const encrypted = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, encrypted]
    );

    const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
