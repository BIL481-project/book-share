const express = require('express');
const router = express.Router();
const { sequelize } = require("../../config/database/db");
const initModels = require("../../models/init-models");
const models = initModels(sequelize);
const User = models.users;

const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/protected', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Profil bilgileri alınamadı', details: error });
  }
});

module.exports = router;
