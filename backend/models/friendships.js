const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Friendship = sequelize.define(
    'Friendship', // Modelin adı
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // İlişkilendirilen modelin adı
          key: 'id', // İlişkilendirilen sütun
        },
      },
      user2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'friendships', // Veritabanı tablosunun adı
      timestamps: false, // createdAt ve updatedAt sütunlarını istemiyoruz
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          fields: ['id'], // Primary key için indeks
        },
        {
          name: 'user1Id_FK',
          fields: ['user1Id'], // user1Id için indeks
        },
        {
          name: 'user2Id_FK',
          fields: ['user2Id'], // user2Id için indeks
        },
      ],
    }
  );

  return Friendship;
};