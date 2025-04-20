const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/auth'));        // Login e cadastro
app.use('/api/me', require('./routes/user'));          // Perfil e /me
app.use('/api/projeto', require('./routes/projeto')); // Projeto

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(3000, () => console.log('Servidor rodando na porta 3000')))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));
