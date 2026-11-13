const Task = require("../models/Task");

const allowedStatuses = [
  "À faire",
  "En cours",
  "Terminé",
];

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAllByProject(
      req.params.projectId,
      req.user.id
    );

    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Le titre est obligatoire",
      });
    }

    if (
      status &&
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        message: "Statut invalide",
      });
    }

    const task = await Task.create(
      req.params.projectId,
      req.user.id,
      title,
      description,
      status
    );

    if (!task) {
      return res.status(404).json({
        message: "Projet introuvable",
      });
    }

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
    } = req.body;

    if (
      status &&
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        message: "Statut invalide",
      });
    }

    const task = await Task.update(
      req.params.id,
      req.user.id,
      title,
      description,
      status
    );

    if (!task) {
      return res.status(404).json({
        message: "Tâche introuvable",
      });
    }

    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.delete(
      req.params.id,
      req.user.id
    );

    if (!deleted) {
      return res.status(404).json({
        message: "Tâche introuvable",
      });
    }

    res.json({
      message: "Tâche supprimée avec succès",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};