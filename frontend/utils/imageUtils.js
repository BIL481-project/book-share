import * as ImagePicker from 'expo-image-picker';
import {Alert} from "react-native";

export const pickImage = async ()=> {

   try {

       const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

       if (!permission.granted) {
           Alert.alert("Gerekli istek verilmedi");
       }

       const image = await ImagePicker.launchImageLibraryAsync({
           allowsEditing: true,
           quality: 1.0,
       });

       return image.assets[0].uri;

   } catch (err){
       Alert.alert("Resim alınamadı");
   }



}
