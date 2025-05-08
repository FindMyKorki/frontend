import React from 'react';
import { View, Text, Image } from 'react-native';
import AppButton from './AppButton';

type TutorListCardProps = {
  name: string;
  price: number;
  description: string;
  onPress: () => void;
  avatarUri?: string;
};

function TutorListCard(props: TutorListCardProps) {
  const { name, price, description, onPress, avatarUri } = props;

  return (
    <View className="flex-row items-center gap-4 px-5 py-3.5 mt-2 rounded-lg bg-white border-2 border-background-alt ">
      {avatarUri && <Image source={{ uri: avatarUri }} className="w-16 h-16 rounded-full" />}

      <View className="flex-1">
        <Text className="font-semibold text-base">{name}</Text>
        <Text className="text-sm text-text-light">{description}</Text>
      </View>

      <View className="items-center gap-1">
        <Text className="font-bold text-base">{price} zł</Text>
        <AppButton label="Umów" onPress={onPress} size="auto" />
      </View>
    </View>
  );
}

export default TutorListCard;
