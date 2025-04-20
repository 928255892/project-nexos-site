const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Projeto = require('../models/Projeto'); // <== necessário para exclusão em cascata
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Editar perfil
router.put('/perfil',
  [
    auth,
    check('nome', 'Nome é obrigatório').not().isEmpty(),
    check('senha', 'Senha deve ter pelo menos 6 caracteres').optional().isLength({ min: 6 })
  ],
  async (req, res) => {
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
  }
);

// Excluir conta do usuário
router.delete('/deletar', auth, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }

    // Excluir projetos do usuário
    await Projeto.deleteMany({ usuario: req.usuario.id });

    // Excluir usuário
    await usuario.deleteOne();

    console.log(`[INFO] Conta excluída: ${usuario.email} (ID: ${usuario._id})`);

    res.json({ msg: 'Conta excluída com sucesso, incluindo projetos vinculados.' });
  } catch (err) {
    console.error('[ERRO] Falha ao excluir conta:', err.message);
    res.status(500).json({ msg: 'Erro ao excluir conta.' });
  }
});

module.exports = router;
