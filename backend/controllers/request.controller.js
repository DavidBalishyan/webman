import { db } from "../models/db.js";

export const logRequest = async (req, res) => {
  const { method, url, headers, body } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      "INSERT INTO requests (user_id, method, url, headers, body) VALUES (?, ?, ?, ?, ?)",
      [userId, method, url, JSON.stringify(headers), JSON.stringify(body)]
    );
    res.json({ message: "Request logged successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to log request", details: err });
  }
};
