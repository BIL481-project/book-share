const { sequelize, testConnection } = require('../config/database/db');
const { Sequelzie, Model, DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "userName_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "userName_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userName" },
        ]
      },
    ]
});

module.exports = User;
