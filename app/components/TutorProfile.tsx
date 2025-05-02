import { FC } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StarRating from './StarRating';

type TutorProfileProps = {
  tutorName: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  description: string;
  onPressReviews?: () => void;
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
    <View className="bg-white p-4">
      <View className="flex-row">
        <View className="mr-4">
          <Image
            source={{ uri: avatarUrl }}
            className="w-28 h-28 rounded-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1 justify-center">
          <Text className="text-[20px] font-bold text-black font-['Inter']">{tutorName}</Text>

          <View className="flex-row items-center mt-1">
            <StarRating rating={rating} size={16} />
            <Text className="ml-2 text-[14px] font-bold font-['Inter'] text-black">
              {rating.toFixed(1)}/5
            </Text>
          </View>

          <Pressable onPress={onPressReviews} className="flex-row items-center mt-1">
            <Text className="text-[#1A5100] font-bold text-sm">{reviewCount} opinii</Text>
            <MaterialIcons name="arrow-right" size={20} color="#1A5100" style={{ marginLeft: 2 }} />
          </Pressable>
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-[14px] text-[#3D3D3D] font-['Inter'] font-medium">{description}</Text>
      </View>
    </View>
  );
};

export default TutorProfile;
