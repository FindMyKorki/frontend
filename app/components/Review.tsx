import { FC } from 'react';
import { View, Text, Image } from 'react-native';
import StarRating from './StarRating';

type ReviewType = {
  fullName: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  maxRating?: number;
};

const Review: FC<ReviewType> = ({ fullName, avatarUrl, comment, rating, maxRating = 5 }) => {
  return (
    <View className="bg-background px-def-x py-def-y rounded-lg border-2 border-background-alt space-y-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-3">
          <Image source={{ uri: avatarUrl }} className="w-12 h-12 rounded-full text-left" />

          <Text className="font-bold text-primary text-base">{fullName}</Text>
        </View>

        <View className="flex-col h-full">
          <StarRating rating={rating} size={22} maxRating={maxRating} />
        </View>
      </View>

      <Text className="text-text-light italic">{comment}</Text>
    </View>
  );
};

export default Review;
