const { pool } = require("../config/db");

const Task = {
  async findAllByProject(projectId, userId) {
    const [rows] = await pool.execute(
      `SELECT
        t.id,
        t.project_id,
        t.title,
        t.description,
        t.status,
        t.created_at
       FROM tasks t
       INNER JOIN projects p
         ON t.project_id = p.id
       WHERE t.project_id = ?
         AND p.user_id = ?
       ORDER BY t.created_at DESC`,
      [projectId, userId]
    );

    return rows;
  },

  async findById(id, userId) {
    const [rows] = await pool.execute(
      `SELECT
        t.id,
        t.project_id,
        t.title,
        t.description,
        t.status,
        t.created_at
       FROM tasks t
       INNER JOIN projects p
         ON t.project_id = p.id
       WHERE t.id = ?
         AND p.user_id = ?`,
      [id, userId]
    );

    return rows[0];
  },

  async create(projectId, userId, title, description, status) {
    const [projects] = await pool.execute(
      `SELECT id
       FROM projects
       WHERE id = ? AND user_id = ?`,
      [projectId, userId]
    );

    if (projects.length === 0) {
      return null;
    }

    const [result] = await pool.execute(
      `INSERT INTO tasks
       (project_id, title, description, status)
       VALUES (?, ?, ?, ?)`,
      [
        projectId,
        title,
        description || null,
        status || "À faire",
      ]
    );

    return this.findById(result.insertId, userId);
  },

  async update(id, userId, title, description, status) {
    const existingTask = await this.findById(id, userId);

    if (!existingTask) {
      return null;
    }

    const newTitle = title ?? existingTask.title;
    const newDescription =
      description ?? existingTask.description;
    const newStatus = status ?? existingTask.status;

    const [result] = await pool.execute(
      `UPDATE tasks
       SET title = ?, description = ?, status = ?
       WHERE id = ?`,
      [
        newTitle,
        newDescription,
        newStatus,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.findById(id, userId);
  },

  async delete(id, userId) {
    const [result] = await pool.execute(
      `DELETE t
       FROM tasks t
       INNER JOIN projects p
         ON t.project_id = p.id
       WHERE t.id = ?
         AND p.user_id = ?`,
      [id, userId]
    );

    return result.affectedRows > 0;
  },
};

module.exports = Task;