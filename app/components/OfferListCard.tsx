import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import AppButton from './AppButton';

type OfferListCardProps = {
  name: string;
  price: number;
  description: string;
  onProfilePress: () => void;
  onBookPress: () => void;
  avatarUri?: string;
};

function OfferListCard(props: OfferListCardProps) {
  const { name, price, description, onProfilePress, onBookPress, avatarUri } = props;
  console.log(description);
  return (
    <View className="flex-row items-center gap-4 px-5 py-3.5 mt-2 rounded-lg bg-white border-2 border-background-alt ">
      {avatarUri && (
        <Pressable onPress={onBookPress}>
          <Image source={{ uri: avatarUri }} className="w-16 h-16 rounded-full" />
        </Pressable>
      )}

      <Pressable className="flex-1" onPress={onBookPress}>
        <Text className="font-semibold text-base">{name}</Text>
        <Text className="text-sm text-text-light">{description}</Text>
      </Pressable>

      <View className="items-center gap-1">
        <Text className="font-bold text-base">{price} zł</Text>
        <AppButton label="Umów" onPress={onProfilePress} size="auto" />
      </View>
    </View>
  );
}

export default OfferListCard;
