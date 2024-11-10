const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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

module.exports = router;