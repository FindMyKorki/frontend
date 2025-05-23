import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const takePhoto = async (setImage: (image: string | null) => void) => {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  if (!cameraPermission.granted) {
    Alert.alert('Permission required', 'Camera access is needed to take photos.');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: 'images',
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
    setImage(result.assets[0].uri);
  }
};

export const selectImageFromGallery = async (setImage: (image: string | null) => void) => {
  const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!galleryPermission.granted) {
    Alert.alert('Permission required', 'Gallery access is needed to pick an image.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
    setImage(result.assets[0].uri);
  }
};
