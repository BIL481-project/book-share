var DataTypes = require("sequelize").DataTypes;
var _books = require("./books");
var _friendships = require("./friendships");
var _messages = require("./messages");
var _notifications = require("./notifications");
var _users = require("./users");

function initModels(sequelize) {
  var books = _books(sequelize, DataTypes);
  var friendships = _friendships(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  books.belongsTo(users, { as: "borrower", foreignKey: "borrowerId"});
  users.hasMany(books, { as: "books", foreignKey: "borrowerId"});
  books.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(books, { as: "owner_books", foreignKey: "ownerId"});
  friendships.belongsTo(users, { as: "user1", foreignKey: "user1Id"});
  users.hasMany(friendships, { as: "friendships", foreignKey: "user1Id"});
  friendships.belongsTo(users, { as: "user2", foreignKey: "user2Id"});
  users.hasMany(friendships, { as: "user2_friendships", foreignKey: "user2Id"});
  messages.belongsTo(users, { as: "receiver", foreignKey: "receiverId"});
  users.hasMany(messages, { as: "messages", foreignKey: "receiverId"});
  messages.belongsTo(users, { as: "sender", foreignKey: "senderId"});
  users.hasMany(messages, { as: "sender_messages", foreignKey: "senderId"});
  notifications.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(notifications, { as: "notifications", foreignKey: "userId"});

  return {
    books,
    friendships,
    messages,
    notifications,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
