const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
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
      senha, // senha simples aqui – será criptografada no model
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

    res.status(200).send('Login bem-sucedido!');
  } catch (error) {
    res.status(500).send('Erro ao fazer login.');
  }
});

module.exports = router;
