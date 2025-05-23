import React, { FC } from 'react';
import { View, Image, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../src/colors';

type ImageInputProps = {
  image: string | null;
  onImagePress: () => void;
};

const ImageInput: FC<ImageInputProps> = ({ image, onImagePress }) => {
  return (
    <Pressable onPress={onImagePress} className="relative">
      <Image
        source={{ uri: image || 'https://avatar.iran.liara.run/public/1' }}
        className="w-28 h-28 rounded-full"
        resizeMode="cover"
      />

      <View className="absolute top-0 right-0 bg-background-alt rounded-full p-1.5">
        <MaterialIcons name="edit" size={20} color={Colors.primary} />
      </View>
    </Pressable>
  );
};

export default ImageInput;
