const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Editar perfil
router.put('/perfil', auth, async (req, res) => {
  const { nome, avatar, senha } = req.body;

  const atualizacoes = {};
  if (nome) atualizacoes.nome = nome;
  if (avatar) atualizacoes.avatar = avatar;

  try {
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      atualizacoes.senha = await bcrypt.hash(senha, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.usuario.id,
      { $set: atualizacoes },
      { new: true }
    ).select('-senha');

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao atualizar perfil.' });
  }
});

module.exports = router;
