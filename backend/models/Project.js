const { pool } = require("../config/db");

const Project = {
  async findAllByUser(userId) {
    const [rows] = await pool.execute(
      `SELECT id, user_id, title, description, due_date, created_at
       FROM projects
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    return rows;
  },

  async findById(id, userId) {
    const [rows] = await pool.execute(
      `SELECT id, user_id, title, description, due_date, created_at
       FROM projects
       WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    return rows[0];
  },

  async create(userId, title, description, dueDate) {
    const [result] = await pool.execute(
      `INSERT INTO projects
       (user_id, title, description, due_date)
       VALUES (?, ?, ?, ?)`,
      [userId, title, description || null, dueDate || null]
    );

    return this.findById(result.insertId, userId);
  },

  async update(id, userId, title, description, dueDate) {
    const [result] = await pool.execute(
      `UPDATE projects
       SET title = ?, description = ?, due_date = ?
       WHERE id = ? AND user_id = ?`,
      [
        title,
        description || null,
        dueDate || null,
        id,
        userId,
      ]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.findById(id, userId);
  },

  async delete(id, userId) {
    const [result] = await pool.execute(
      `DELETE FROM projects
       WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    return result.affectedRows > 0;
  },
};

module.exports = Project;