const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Notification = sequelize.define(
    'notifications', // Modelin adı
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // İlişkilendirilen modelin adı
          key: 'id', // İlişkilendirilen sütun
        },
      },
      content: {
        type: DataTypes.JSON, // JSON formatında bildirim içeriği
        allowNull: false,
      },
    },
    {
      tableName: 'notifications', // Veritabanı tablosunun adı
      timestamps: false, // createdAt ve updatedAt sütunlarını istemiyoruz
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: "BTREE",
          fields: ['id'], // Primary key için indeks
        },
        {
          name: 'userId_FK',
          using: "BTREE",
          fields: ['userId'], // Kullanıcı için indeks
        },
      ],
    }
  );

  return Notification;
};