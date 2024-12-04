import authApi from '../axios_instances/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getSessionUserId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                reject(false); // Token yok, resolve ile false döndür
            } else {
                console.log('Token found:', token);

                const response = await authApi.get('/auth/me');

                const data = response.data;
                if(data.error) {
                    reject(false);
                }

                const userId = JSON.stringify(data.user.userId);
                
                resolve(userId); // Token bulundu, resolve ile userId'yi döndür
            }
        } catch (error) {
            console.error('Error while initializing:', error);
            reject(error); // Hata durumunda reject ile hata fırlat
        }
    });
};

module.exports = { getSessionUserId };