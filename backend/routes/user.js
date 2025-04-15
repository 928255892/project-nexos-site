const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-senha'); // Removemos a senha

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      nome: user.nome,
      email: user.email,
      avatar: user.avatar || null,
      projetos: user.projetos || [],
      notificacoes: user.notificacoes || []
    });
  } catch (err) {
    console.error('Erro ao buscar dados do usuário:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
