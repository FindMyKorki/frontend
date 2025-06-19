import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import LessonDetails from '../components/LessonDetails';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { apiCall } from '../utils/ApiHandler';

type Offer = {
  price: number;
  subject_name: string;
  description: string;
  level: string;
  tutor_full_name: string;
};

type ParamTypes = {
  offer_id: number;
  startTime: string;
  endTime: string;
};

const MAXIMAGES = 10;

const BookingDetailsScreen = () => {
  const nav = useNavigation();
  const route = useRoute();
  const [images, setImages] = useState<string[]>([]);
  const [text, setText] = useState('');

  const [offer, setOffer] = useState<Offer | null>(null);
  const params = route.params as ParamTypes;

  const offer_id = params.offer_id;
  const startTime = new Date(params.startTime);
  const endTime = new Date(params.endTime);

  useEffect(() => {
    const getOffer = async () => {
      const offer: Offer = await apiCall({
        method: 'GET',
        url: `/offers/${offer_id}`,
      });
      setOffer(offer);
    };

    try {
      getOffer();
    } catch (e) {
      console.error('GET /offers/${offer_id}', e);
    }
  }, []);

  const pickImage = async () => {
    if (images.length >= MAXIMAGES) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied to access media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const assets = result.assets;
      const remainSpace = MAXIMAGES - images.length;
      const assetslenght = remainSpace > assets.length ? assets.length : remainSpace;

      for (let i = 0; i < assetslenght; i++) {
        if (images.length >= MAXIMAGES) return;
        setImages((prev) => [...prev, assets[i].uri]);
      }
    }
  };

  const takePhoto = async () => {
    if (images.length >= MAXIMAGES) return;

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied to access camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
      cameraType: ImagePicker.CameraType.back,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      setImages((prev) => [...prev, newUri]);
    }
  };

  const handleBooking = async () => {
    const formData = new FormData();
    if (text.length !== 0) formData.append('notes', text);
    formData.append('offer_id', offer_id.toString());
    formData.append('start_date', startTime.toISOString());
    formData.append('end_date', endTime.toISOString());
    images.forEach((photo, idx) => {
      const filename = photo.split('/').pop() || `attachment_${idx}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';

      formData.append('files', {
        uri: photo,
        name: filename,
        type,
      } as any);
    });

    try {
      const response = await apiCall({
        method: 'POST',
        url: '/bookings:propose',
        data: formData,
      });
      console.log(response);
    } catch (e) {
      console.error('POST /bookings:propose', e);
    }
  };

  return (
    <View className="bg-background flex-1">
      {/* Header */}
      <View className="flex-row px-4 py-3">
        <TouchableOpacity onPress={() => nav.goBack()} className="pr-3">
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text className="text-lg text-text-dark font-[Inter]">Podaj szczegóły lekcji</Text>
      </View>

      {/* Lesson Card */}
      {offer !== null && (
        <LessonDetails
          offer={offer}
          startTime={startTime}
          endTime={endTime}
          className="px-4 py-3"
        />
      )}

      {/* Attachments List */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => item + index}
        numColumns={2}
        className="px-4"
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item, index }) => (
          <View className="items-center w-48 h-80 mb-3.5">
            <Image source={{ uri: item }} className="w-full h-full" />
            <TouchableOpacity
              className="absolute top-1 right-1 bg-black/70 rounded-full p-1"
              onPress={() => {
                setImages((prev) => prev.filter((_, i) => i !== index));
              }}
            >
              <MaterialIcons name="close" size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={
          <View>
            {/* Topic Input */}
            <View className="py-3">
              <Text className="text-base text-text-dark font-bold mb-2.5 font-[Inter]">
                Temat zajęć
              </Text>
              <TextInput
                className="border border-border-gray rounded-xl px-4"
                value={text}
                onChangeText={setText}
              />
            </View>

            {/* Attachments */}
            <View className="py-3 my-5">
              <View className="mb-2.5 flex-row">
                <Text className="text-base text-text-dark font-bold font-[Inter]">
                  Załącz materiały
                </Text>
                <Text className="ml-auto text-base text-text-light self-center font-[Inter]">
                  {`${images.length} załączniki`}
                </Text>
              </View>

              <View className="flex-row">
                <TouchableOpacity
                  className="bg-background border border-background-alt rounded-md px-6 py-3 mr-2.5"
                  onPress={pickImage}
                >
                  <Text className="font-[Inter] text-base text-text-dark">Galeria</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-background border border-background-alt rounded-md px-6 py-3"
                  onPress={takePhoto}
                >
                  <Text className="font-[Inter] text-base text-text-dark">Aparat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={<View className="h-15 mt-10 pt-5" />}
      />

      {/* Buttons */}
      <View
        className="flex-row justify-between px-4 py-3 absolute bottom-0 left-0 right-0 bg-background shadow-xl/70"
        style={{ elevation: 10 }}
      >
        <TouchableOpacity
          className="flex-1 bg-background border border-primary rounded-lg py-2.5 px-11 mr-2"
          onPress={() => nav.goBack()}
        >
          <Text className="text-center font-bold font-[Inter] text-text-dark">Wróć</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-primary rounded-lg py-2.5 px-11 ml-2"
          onPress={handleBooking}
        >
          <Text className="text-center font-bold font-[Inter] text-background">Umów</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingDetailsScreen;
