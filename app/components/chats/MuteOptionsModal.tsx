import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const MuteOptionsModal = ({ visible, onClose }: Props) => (
  <Modal transparent visible={visible} animationType="slide">
    <Pressable onPress={onClose} className="flex-1 bg-black/30 justify-end">
      <View className="bg-white p-6 rounded-t-2xl space-y-6 items-center">
        <View className="h-1 w-12 bg-gray-300 self-center rounded-full mb-2" />

        <Text className="text-lg font-semibold text-text-dark mb-2">Czas wyciszenia:</Text>

        {['15 minut', '1 godzina', '8 godzin', 'Bezterminowo'].map((label, idx) => (
          <Pressable
            key={idx}
            className="flex-row items-center space-x-3 py-3"
            onPress={() => console.log(label)}
          >
            <MaterialIcons
              name={label === 'Bezterminowo' ? 'pause-circle-outline' : 'schedule'}
              size={20}
              color="#1A5100"
            />
            <Text className="text-base text-text-dark pl-3">{label}</Text>
          </Pressable>
        ))}
      </View>
    </Pressable>
  </Modal>
);

export default MuteOptionsModal;
