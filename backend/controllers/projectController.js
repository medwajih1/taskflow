const Project = require("../models/Project");

// GET ALL
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAllByUser(
      req.user.id
    );

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// GET ONE
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id,
      req.user.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Projet introuvable",
      });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// CREATE
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Le titre est obligatoire",
      });
    }

    const project = await Project.create(
      req.user.id,
      title,
      description,
      due_date
    );

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// UPDATE
const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Le titre est obligatoire",
      });
    }

    const project = await Project.update(
      req.params.id,
      req.user.id,
      title,
      description,
      due_date
    );

    if (!project) {
      return res.status(404).json({
        message: "Projet introuvable",
      });
    }

    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// DELETE
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.delete(
      req.params.id,
      req.user.id
    );

    if (!deleted) {
      return res.status(404).json({
        message: "Projet introuvable",
      });
    }

    res.json({
      message: "Projet supprimé avec succès",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};