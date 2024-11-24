const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define(
    'messages', // Modelin adı
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false, // Mesaj içeriği boş olamaz
      },
      date: {
        type: DataTypes.DATEONLY, // Sadece tarih (saat bilgisi olmadan)
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Varsayılan durum değeri
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // İlişkilendirilen modelin adı
          key: 'id', // İlişkilendirilen sütun
        },
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'messages', // Veritabanı tablosunun adı
      timestamps: false, // createdAt ve updatedAt sütunlarını istemiyoruz
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: "BTREE",
          fields: ['id'], // Primary key için indeks
        },
        {
          name: 'senderId_FK',
          using: "BTREE",
          fields: ['senderId'], // Gönderen kullanıcı için indeks
        },
        {
          name: 'receiverId_FK',
          using: "BTREE",
          fields: ['receiverId'], // Alıcı kullanıcı için indeks
        },
      ],
    }
  );

  return Message;
};