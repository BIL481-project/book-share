const UserModel = require('./users');
const BookModel = require('./books');
const FriendshipModel = require('./friendships');
const MessageModel = require('./messages');
const NotificationModel = require('./notifications');

function initModels(sequelize) {
  const User = UserModel(sequelize);
  const Book = BookModel(sequelize);
  const Friendship = FriendshipModel(sequelize);
  const Message = MessageModel(sequelize);
  const Notification = NotificationModel(sequelize);

  // İlişkiler
  // User ve Book ilişkileri
  Book.belongsTo(User, { as: 'borrower', foreignKey: 'borrowerId' });
  User.hasMany(Book, { as: 'books', foreignKey: 'borrowerId' });

  Book.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
  User.hasMany(Book, { as: 'owner_books', foreignKey: 'ownerId' });

  // User ve Friendship ilişkileri
  Friendship.belongsTo(User, { as: 'user1', foreignKey: 'user1Id' });
  User.hasMany(Friendship, { as: 'friendships', foreignKey: 'user1Id' });

  Friendship.belongsTo(User, { as: 'user2', foreignKey: 'user2Id' });
  User.hasMany(Friendship, { as: 'user2_friendships', foreignKey: 'user2Id' });

  // User ve Message ilişkileri
  Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });
  User.hasMany(Message, { as: 'messages', foreignKey: 'receiverId' });

  Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
  User.hasMany(Message, { as: 'sender_messages', foreignKey: 'senderId' });

  // User ve Notification ilişkileri
  Notification.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  User.hasMany(Notification, { as: 'notifications', foreignKey: 'userId' });

  return {
    User,
    Book,
    Friendship,
    Message,
    Notification,
  };
}

module.exports = initModels;