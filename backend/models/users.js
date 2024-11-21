const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User', // Modelin adı
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
        unique: true, // Benzersiz
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Benzersiz
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
          fields: ['id'], // Primary key için indeks
        },
        {
          name: 'email',
          unique: true,
          fields: ['email'], // Email için indeks
        },
        {
          name: 'userName_UNIQUE',
          unique: true,
          fields: ['userName'], // userName için indeks
        },
      ],
    }
  );

  return User;
};