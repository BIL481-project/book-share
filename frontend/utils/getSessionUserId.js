import authApi from '../axios_instances/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getSessionUserId = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.log('No token found.');
            return null;
        }

        console.log('Token found:', token);

        const response = await authApi.get('/auth/me');
        if (response.data.error) {
            console.error('Authentication error:', response.data.error);
            return null;
        }

        return response.data.user.userId; // Direkt userId döndür
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return null; // Hata durumunda null döndür
    }
};

export { getSessionUserId };