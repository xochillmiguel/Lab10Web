import { pool } from "../../data/connection.js";
import { JWT_SECRET } from "../../keys/keys.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
