const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'users', // Modelin adı
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: "userName_UNIQUE",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "email", // Benzersiz
        validate: {
          isEmail: true, // Email format kontrolü
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'users', // Veritabanı tablosunun adı
      timestamps: true, // createdAt ve updatedAt sütunlarını ekler
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: "BTREE",
          fields: ['id'], // Primary key için indeks
        },
        {
          name: 'email',
          unique: true,
          using: "BTREE",
          fields: ['email'], // Email için indeks
        },
        {
          name: 'userName_UNIQUE',
          unique: true,
          using: "BTREE",
          fields: ['userName'], // userName için indeks
        },
      ],
    }
  );

  return User;
};