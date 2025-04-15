// Caminho: backend/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');

// Rota para criar novo projeto (protegida)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const novoProjeto = new Project({
      titulo,
      descricao,
      user: req.user._id
    });

    await novoProjeto.save();

    res.status(201).json({
      mensagem: 'Projeto criado com sucesso!',
      projeto: novoProjeto
    });
  } catch (err) {
    console.error('Erro ao criar projeto:', err);
    res.status(500).json({ message: 'Erro ao criar projeto.' });
  }
});

// Rota para listar projetos do usuário autenticado (protegida)
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
