const { Notification } = require('../models');

const createNotification = async (notificationDetails, transaction = null) => {
    try {
        const createdNotification = await Notification.create(notificationDetails, { transaction });
        return createdNotification;
    } catch (error) {
        throw new RepositoryError(`Error creating notification: ${error.message}`);
    }
};

findNotificationsByUserId = async (userId) => {
    try {
        const notifications = await Notification.findAll({ where: { userId } });
        return notifications;
    } catch (error) {
        throw new RepositoryError(`Error fetching notifications: ${error.message}`);
    }
};

module.exports = { createNotification, findNotificationsByUserId }; 