const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Certifique-se de que o modelo de User está configurado

// Rota para cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send('Usuário já cadastrado!');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = new User({
      nome,
      email,
      senha: hashedPassword,
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

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).send('Senha incorreta.');
    }

    // Lógica para gerar e retornar o JWT (JSON Web Token) se necessário
    // Exemplo de um token JWT (se você for usar)
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send('Login bem-sucedido!');
  } catch (error) {
    res.status(500).send('Erro ao fazer login.');
  }
});

module.exports = router;
