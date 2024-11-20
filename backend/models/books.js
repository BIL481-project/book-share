const { sequelize, testConnection } = require('../config/database/db');
const { Sequelzie, Model, DataTypes } = require('sequelize');

const Book = sequelize.define('books', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isAvailable: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    borrowerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    genre: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'books',
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
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ownerId_FK",
        using: "BTREE",
        fields: [
          { name: "ownerId" },
        ]
      },
      {
        name: "borrowerId_FK",
        using: "BTREE",
        fields: [
          { name: "borrowerId" },
        ]
      },
    ]
});

module.exports = Book;
