const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido.' });
  }
};
