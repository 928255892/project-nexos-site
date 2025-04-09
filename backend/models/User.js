const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir esquema de usuário
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  }
});

// Criptografar senha antes de salvar no banco de dados
userSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();

  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

// Método para comparar senhas
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.senha);
};

// Exportar modelo
module.exports = mongoose.model('User', userSchema);
