import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';

// Axios instance'ı oluşturuyoruz
const authApi = axios.create({
  baseURL: BACKEND_URL, // Backend'in URL'si
});

// Request interceptor ile her isteğe token ekliyoruz
authApi.interceptors.request.use(
  async (config) => {
    try {
      // AsyncStorage'dan token alıyoruz
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Authorization header'a Bearer token ekliyoruz
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Token alınamadı:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    // İstek gönderilemeden önce hata alınırsa buraya düşer
    return Promise.reject(error);
  }
);

// Response interceptor ile yanıttan gelen hata bilgileri yakalanır
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Hatası:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default authApi;
