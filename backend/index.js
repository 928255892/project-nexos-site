const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Se ainda não existir, vou criar esse já

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para ler JSON
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 Conectado ao MongoDB Atlas'))
  .catch(err => console.error('🔴 Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando com MongoDB Atlas!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
