const RepositoryError = require('../errors/RepositoryError');
const NotificationRepository = require('../repositories/notificationRepository');

const addNotification = async (notificationDetails, transaction = null) => {
    try {
        await NotificationRepository.createNotification(notificationDetails, transaction);
    } catch (error) {
        if (error instanceof RepositoryError) {
            throw error;
        }
        else {
            throw new ServiceError(`Error in addNotification: ${error.message}`);
        }
    }
};

const getUserNotifications = async (userId) => {
    try {
        const notifications = await NotificationRepository.findNotificationsByUserId(userId);
        return notifications;
    } catch (error) {
        throw new ServiceError(`Error in getUserNotifications: ${error.message}`);
    }
};

module.exports = { addNotification, getUserNotifications };