const { pool } = require("../config/db");

const User = {
  async findByEmail(email) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT id, firstName, lastName, email, created_at
       FROM users
       WHERE id = ?`,
      [id]
    );

    return rows[0];
  },

  async create(firstName, lastName, email, password) {
    const [result] = await pool.execute(
      `INSERT INTO users
       (firstName, lastName, email, password)
       VALUES (?, ?, ?, ?)`,
      [firstName, lastName, email, password]
    );

    return result.insertId;
  },
};

module.exports = User;