const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');

// Rota protegida para listar os projetos do usuário autenticado
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({ user: userId });

    res.status(200).json(projects);
  } catch (err) {
    console.error('Erro ao buscar projetos:', err);
    res.status(500).json({ message: 'Erro ao buscar projetos.' });
  }
});

module.exports = router;
