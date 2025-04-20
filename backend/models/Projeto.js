const mongoose = require('mongoose');

const ProjetoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    default: '',
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Projeto', ProjetoSchema);
