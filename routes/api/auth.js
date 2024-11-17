const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../backend/Models/User');
const router = express.Router();

// Kullanıcı Kaydı
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.json({ message: 'Kullanıcı başarıyla oluşturuldu', user });
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı oluşturulamadı', details: error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Veritabanında kullanıcıyı bul
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // 2. Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Şifre yanlış' });
    }

    // 3. Token oluştur
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, // Bu secret'ı .env dosyanıza ekleyin
      { expiresIn: '1h' } // Tokenin geçerlilik süresi (örnek: 1 saat)
    );

    // 4. Başarılı yanıt dön
    res.json({ message: 'Giriş başarılı', token });
  } catch (error) {
    res.status(500).json({ error: 'Giriş sırasında hata oluştu', details: error });
  }
});

module.exports = router;