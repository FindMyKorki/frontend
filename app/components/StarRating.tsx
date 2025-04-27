import { FC } from 'react';
import { View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type StarRatingType = {
  rating: number;
  size: number;
  maxRating?: number;
};

const StarRating: FC<StarRatingType> = ({ rating, size, maxRating = 5 }) => {
  const getStarIconName = (starNum: number) => {
    if (starNum <= rating) return 'star';
    if (starNum - rating < 1) return 'star-half';
    return 'star-border';
  };

  return (
    <View className="flex-row">
      {[...Array(maxRating)].map((_, i) => (
        <MaterialIcons key={i} name={getStarIconName(i + 1)} size={size} className="text-primary" />
      ))}
    </View>
  );
};

export default StarRating;
