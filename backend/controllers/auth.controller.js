import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../models/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const [rows] = await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed]);
    res.json({ message: "User registered", userId: rows.insertId });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) return res.status(404).json({ error: "User not found" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
};
