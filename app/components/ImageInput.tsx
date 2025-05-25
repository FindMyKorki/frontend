import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../src/colors';

type ImageInputProps = {
  image: string | null;
  onImagePress: () => void;
};

const ImageInput: FC<ImageInputProps> = ({ image, onImagePress }) => {
  return (
    <TouchableOpacity onPress={onImagePress} className="w-28 h-28 relative">
      {image ? (
        <Image source={{ uri: image }} className="flex-1 rounded-full" resizeMode="cover" />
      ) : (
        <View className="bg-empty-image flex-1 rounded-full" />
      )}
      <View className="absolute top-0 right-0 bg-background-alt rounded-full p-1.5">
        <MaterialIcons name="edit" size={20} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

export default ImageInput;
