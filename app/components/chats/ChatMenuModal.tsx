import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import BellOffIcon from './BellOffIcon';

type Props = {
  visible: boolean;
  onClose: () => void;
  onMute: () => void;
};

const ChatMenuModal = ({ visible, onClose, onMute }: Props) => (
  <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
    <Pressable onPress={onClose} className="flex-1 bg-black/30 justify-end">
      <View className="bg-white p-6 rounded-t-2xl space-y-4 items-center">
        <View className="h-1 w-12 bg-gray-300 self-center rounded-full mb-2" />

        <Pressable onPress={onMute} className="flex-row items-center space-x-2 py-3">
          <BellOffIcon />
          <Text className="text-base text-text-dark pl-4">Wycisz</Text>
        </Pressable>

        <Pressable
          className="flex-row items-center space-x-2 py-3"
          onPress={() => console.log('Archiwizuj')}
        >
          <Entypo name="download" size={20} color="#1A5100" />
          <Text className="text-base text-text-dark pl-4">Archiwizuj</Text>
        </Pressable>

        <Pressable
          className="flex-row items-center space-x-2 py-3"
          onPress={() => console.log('Zgłoś')}
        >
          <Entypo name="flag" size={20} color="#1A5100" />
          <Text className="text-base text-text-dark pl-4">Zgłoś</Text>
        </Pressable>
      </View>
    </Pressable>
  </Modal>
);

export default ChatMenuModal;
