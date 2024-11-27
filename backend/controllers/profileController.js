const ProfileService = require('../services/profileService');

const getUserProfile = async (req, res) => {
    try {
        const { userName } = req.params; // Kullan�c� ad� URL'den al�n�yor
        if (!userName) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const profile = await ProfileService.getUserProfile({
            where: { userName: userName }
        });
        return res.status(200).json(profile);

    } catch (error) {
        console.error('Error in getUserProfile:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

const getUserProfileByToken = async (req, res) => {
    try {
        const myemail = req.user.email; // Kullan�c� ad� URL'den al�n�yor
        if (!myemail) {
            return res.status(400).json({ message: 'email is required' });
        }

        const profile = await ProfileService.getUserProfile({
            where: { email: myemail }
        });
        return res.status(200).json(profile);

    } catch (error) {
        console.error('Error in getUserProfile:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
    getUserProfileByToken,
};