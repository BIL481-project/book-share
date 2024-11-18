const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Şifreyi kaydetmeden önce hash'leme işlemi
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
