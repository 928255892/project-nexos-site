const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chave-supersecreta';

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email já registrado.' });

    const user = await User.create({ nome, email, senha });

    // Gerar token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ user: { id: user._id, nome: user.nome, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao registrar usuário.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email }).select('+senha');
    if (!user) return res.status(400).json({ msg: 'Credenciais inválidas.' });

    const isMatch = await user.comparePassword(senha);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciais inválidas.' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ user: { id: user._id, nome: user.nome, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao fazer login.' });
  }
};
