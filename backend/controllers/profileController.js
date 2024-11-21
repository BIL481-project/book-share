const ProfileService = require('../services/profileService');

const getUserProfile = async (req, res) => {
    try {
        const { userName } = req.params; // Kullanýcý adý URL'den alýnýyor
        if (!userName) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const profile = await ProfileService.getUserProfile(userName);
        return res.status(200).json(profile);

    } catch (error) {
        console.error('Error in getUserProfile:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
};