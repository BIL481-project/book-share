const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'Token bulunamadı' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(403).json({ error: 'Token formatı geçersiz' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token geçersiz' });
    }
    req.user = decoded; // Token doğrulandıktan sonra kullanıcı bilgilerini req nesnesine ekliyoruz
    next();
  });
};

module.exports = authMiddleware;
