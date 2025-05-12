import React, { FC } from 'react';
import { View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../src/colors';

type StarRatingProps = {
  rating: number;
  size: number;
  maxRating?: number;
};

const StarRating: FC<StarRatingProps> = ({ rating, size, maxRating = 5 }) => {
  const getStarIconName = (starNum: number) => {
    if (starNum <= rating) return 'star';
    if (starNum - rating < 1) return 'star-half';
    return 'star-border';
  };

  return (
    <View className="flex-row">
      {[...Array(maxRating)].map((_, i) => (
        // @ts-ignore
        <MaterialIcons key={i} name={getStarIconName(i + 1)} size={size} color={Colors.primary} />
      ))}
    </View>
  );
};

export default StarRating;
