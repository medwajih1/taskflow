const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// REGISTER
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "Cet email est déjà utilisé",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const userId = await User.create(
      firstName,
      lastName,
      email,
      hashedPassword
    );

    const user = await User.findById(userId);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user,
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const token = generateToken(user.id);

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.json({
      message: "Connexion réussie",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

// PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};