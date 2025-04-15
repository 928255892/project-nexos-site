const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Rota protegida para retornar dados do usuário autenticado
router.get('/me', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.json({
    nome: req.user.nome,
    email: req.user.email,
    avatar: req.user.avatar || null,
    projetos: req.user.projetos || [],
    notificacoes: req.user.notificacoes || []
  });
});

module.exports = router;
