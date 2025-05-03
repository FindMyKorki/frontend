import { FC } from 'react';
import { View, Text, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StarRating from './StarRating';
import Button from './AppButton';

type ReviewProps = {
  fullName: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  buttonOnPress?: () => void;
};

const Review: FC<ReviewProps> = ({
  fullName,
  avatarUrl,
  comment,
  rating,
  buttonOnPress = null,
}) => {
  return (
    <View className="bg-background px-def-x py-def-y rounded-lg border-2 border-background-alt gap-y-3">
      <View className="flex-row flex-wrap justify-between items-center">
        <View className="flex-row items-center gap-x-3">
          <Image source={{ uri: avatarUrl }} className="w-12 h-12 rounded-full text-left" />

          <Text className="font-bold text-base">{fullName}</Text>
        </View>

        <View className="flex-col h-full">
          <StarRating rating={rating} size={22} maxRating={5} />
        </View>
      </View>

      <Text className="text-text-light italic">{comment}</Text>

      {buttonOnPress && (
        <View className="flex-row justify-end">
          <Button
            label="Zgłoś"
            onPress={buttonOnPress}
            icon={<MaterialIcons name="flag" size={20} color="#1A5100" />}
            appearance="transparent"
          />
        </View>
      )}
    </View>
  );
};

export default Review;
