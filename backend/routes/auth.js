const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // ← Importa JWT
const User = require('../models/User');

// Rota para cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send('Usuário já cadastrado!');
    }

    const newUser = new User({
      nome,
      email,
      senha, // será criptografada automaticamente no model
    });

    await newUser.save();
    res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar usuário.');
  }
});

// Rota para login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Usuário não encontrado.');
    }

    const isMatch = await user.comparePassword(senha);
    if (!isMatch) {
      return res.status(400).send('Senha incorreta.');
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ mensagem: 'Login bem-sucedido!', token });
  } catch (error) {
    res.status(500).send('Erro ao fazer login.');
  }
  
});
const authMiddleware = require('../middleware/authMiddleware');

// Exemplo de rota protegida
router.get('/protegida', authMiddleware, (req, res) => {
  res.json({
    mensagem: `Olá, ${req.user.nome}! Seu e-mail é ${req.user.email}. Acesso autorizado.`,
  });
});

module.exports = router;
