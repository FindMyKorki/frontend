import { FC } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StarRating from './StarRating';
import React from 'react';

type TutorProfileProps = {
  tutorName: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  description: string;
  onPressReviews?: () => void;
  isEditable: boolean;
};

const TutorProfile: FC<TutorProfileProps> = ({
  tutorName,
  avatarUrl,
  rating,
  reviewCount,
  description,
  onPressReviews,
}) => {
  return (
    <View className="bg-background p-def-x">
      <View className="flex-row">
        <View className="mr-def-x">
          <Image
            source={{ uri: avatarUrl }}
            className="w-28 h-28 rounded-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1 justify-center">
          <Text className="text-xl font-bold text-text-dark">{tutorName}</Text>

          <View className="flex-row items-center mt-1">
            <StarRating rating={rating} size={16} />
            <Text className="ml-2 text-sm font-bold text-text-dark">{rating.toFixed(1)}/5</Text>
          </View>

          <Pressable onPress={onPressReviews} className="flex-row items-center mt-1">
            <Text className="text-primary font-bold text-xs">{reviewCount} opinii</Text>
            <MaterialIcons name="arrow-right" size={20} color="#1A5100" style={{ marginLeft: 2 }} />
          </Pressable>
        </View>
      </View>

      <View className="mt-def-y">
        <Text className="text-sm text-text-medium font-medium">{description}</Text>
      </View>
    </View>
  );
};

export default TutorProfile;
