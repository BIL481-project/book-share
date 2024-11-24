const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define(
    'books', // Modelin adı
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // İlişkilendirilen modelin adı
          key: 'id', // İlişkilendirilen sütun
        },
      },
      isAvailable: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      borrowerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      genre: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      tableName: 'books', // Veritabanı tablosunun adı
      timestamps: true, // createdAt ve updatedAt sütunlarını ekler
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: "BTREE",
          fields: ['id'], // Primary key için indeks
        },
        {
          name: 'ownerId_FK',
          using: "BTREE",
          fields: ['ownerId'], // ownerId için indeks
        },
        {
          name: 'borrowerId_FK',
          using: "BTREE",
          fields: ['borrowerId'], // borrowerId için indeks
        },
      ],
    }
  );

  return Book;
};