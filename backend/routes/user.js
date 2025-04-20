const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Editar perfil
router.put('/perfil', 
  [
    auth,
    // Adicionar validação de dados (exemplo de validação para o nome e senha)
    check('nome', 'Nome é obrigatório').not().isEmpty(),
    check('senha', 'Senha deve ter pelo menos 6 caracteres').optional().isLength({ min: 6 })
  ], 
  async (req, res) => {

  // Verificar erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao atualizar perfil.' });
  }
});

module.exports = router;
