// Importando dependências
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');  // Importando as rotas de autenticação

// Carregar variáveis de ambiente
dotenv.config();

// Configurar servidor Express
const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao banco de dados"))
  .catch(err => console.log("Erro ao conectar ao banco de dados", err));

// Definir rotas
app.use('/api/auth', authRoutes);

// Iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
