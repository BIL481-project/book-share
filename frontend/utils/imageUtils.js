import * as ImagePicker from 'expo-image-picker';
import authApi from '../axios_instances/authApi';

/**
 * Kullanıcıdan resim seç.
 * @returns {Promise<string>} - Seçilen resmin URI'si.
 */
export const pickImage = async () => {
    try {
        // Galeriye erişim izni al
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            throw new Error('Permission to access media library is required.');
        }

        // Kullanıcıdan resim seç
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        
        if (result.canceled) {
            throw new Error('Image picking was canceled by the user.');
        }

        // Seçilen resmin URI'sini döndür
        return result.assets[0].uri;
    } catch (error) {
        console.error('Error during image picking:', error);
        throw new Error(error.message || 'An error occurred while picking the image.');
    }
};

/**
 * FormData'ya resim ekleyen fonksiyon.
 * @param {FormData} formData - FormData nesnesi.
 * @param {string} imageUri - Seçilen resmin URI'si.
 */
export const addImageToFormData = (formData, imageUri, key = 'image') => {
    if (!imageUri) {
        throw new Error('Image URI is required to add to FormData.');
    }

    const fileName = imageUri.split('/').pop();
    const fileType = `image/${fileName.split('.').pop()}`; // MIME türünü belirle

    const imageFile = {
        uri: imageUri,
        name: fileName,
        type: fileType,
    };

    formData.append(key, imageFile); // Anahtar ve dosyayı FormData'ya ekle
};


module.exports = { pickImage, addImageToFormData };