const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir o esquema do usuário
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: '' // URL do avatar ou base64 (você pode usar avatar padrão)
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project' // Certifique-se de que criará o model Project no futuro
    }
  ],
  notifications: [
    {
      mensagem: String,
      lida: {
        type: Boolean,
        default: false
      },
      data: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

// Criptografar senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

// Exportar o modelo
module.exports = mongoose.model('User', userSchema);
