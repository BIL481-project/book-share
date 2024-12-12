const NotificationService = require('../services/notificationService');

const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.userId; // JWT'den alınan kullanıcı ID'si
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        // Kullanıcının bildirimlerini al
        const notifications = await NotificationService.getUserNotifications(userId);

        return res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        return res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
};

module.exports = { getUserNotifications };