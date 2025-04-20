const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Projeto = require('../models/Projeto');

// Criar novo projeto
router.post('/', auth, async (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo) {
    return res.status(400).json({ msg: 'Título é obrigatório.' });
  }

  try {
    const novoProjeto = new Projeto({
      titulo,
      descricao,
      usuario: req.usuario.id,
    });

    const projeto = await novoProjeto.save();
    res.status(201).json(projeto);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao criar projeto.' });
  }
});

// Listar projetos do usuário autenticado
router.get('/', auth, async (req, res) => {
  try {
    const projetos = await Projeto.find({ usuario: req.usuario.id }).sort({ dataCriacao: -1 });
    res.json(projetos);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao listar projetos.' });
  }
});

// Editar projeto
router.put('/:id', auth, async (req, res) => {
  const { titulo, descricao } = req.body;

  try {
    let projeto = await Projeto.findById(req.params.id);

    if (!projeto) {
      return res.status(404).json({ msg: 'Projeto não encontrado.' });
    }

    if (projeto.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'Não autorizado.' });
    }

    projeto.titulo = titulo || projeto.titulo;
    projeto.descricao = descricao || projeto.descricao;

    const projetoAtualizado = await projeto.save();
    res.json(projetoAtualizado);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao editar projeto.' });
  }
});

// Deletar projeto
router.delete('/:id', auth, async (req, res) => {
  try {
    const projeto = await Projeto.findById(req.params.id);

    if (!projeto) {
      return res.status(404).json({ msg: 'Projeto não encontrado.' });
    }

    if (projeto.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'Não autorizado.' });
    }

    await projeto.deleteOne();
    res.json({ msg: 'Projeto deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao deletar projeto.' });
  }
});

module.exports = router;
