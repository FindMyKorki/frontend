import React, { useState } from 'react';
import { View, Text, Image, Pressable, Modal } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const BellOffIcon = ({ width = 21, height = 21 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 21 21" fill="none">
    <Path
      d="M2.99999 17V15H4.99999V8C4.99999 7.45 5.07083 6.90833 5.21249 6.375C5.35416 5.84167 5.56666 5.33333 5.84999 4.85L8.99999 8H6.19999L0.399994 2.2L1.79999 0.8L20.2 19.2L18.8 20.6L15.15 17H2.99999ZM17 13.15L7.19999 3.35C7.53333 3.08333 7.89166 2.85 8.27499 2.65C8.65833 2.45 9.06666 2.3 9.49999 2.2V1.5C9.49999 1.08333 9.64583 0.729167 9.93749 0.4375C10.2292 0.145833 10.5833 0 11 0C11.4167 0 11.7708 0.145833 12.0625 0.4375C12.3542 0.729167 12.5 1.08333 12.5 1.5V2.2C13.8333 2.53333 14.9167 3.2375 15.75 4.3125C16.5833 5.3875 17 6.61667 17 8V13.15ZM11 20C10.45 20 9.97916 19.8042 9.58749 19.4125C9.19583 19.0208 8.99999 18.55 8.99999 18H13C13 18.55 12.8042 19.0208 12.4125 19.4125C12.0208 19.8042 11.55 20 11 20Z"
      fill="#1A5100"
    />
  </Svg>
);

type ChatPreviewProps = {
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  onPress: () => void;
};

const ChatPreview = ({
  name,
  avatarUrl,
  lastMessage,
  timestamp,
  unreadCount,
  onPress,
}: ChatPreviewProps) => {
  const [muteOptionsVisible, setMuteOptionsVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={onPress}
        className="flex-row items-center p-4 bg-white border-b border-border-gray"
      >
        <Image source={{ uri: avatarUrl }} className="w-12 h-12 rounded-full" />

        <View className="flex-1 ml-4">
          <View className="flex-row justify-between">
            <Text className="text-base font-bold text-text-dark">{name}</Text>
            <Text className="text-xs text-text-light">{timestamp}</Text>
          </View>

          <View className="flex-row justify-between items-center mt-1">
            <Text numberOfLines={1} className="flex-1 text-sm text-text-medium">
              {lastMessage}
            </Text>
            {unreadCount ? (
              <View className="bg-primary rounded-full w-5 h-5 items-center justify-center ml-2">
                <Text className="text-xs text-white font-bold">{unreadCount}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <Pressable onPress={() => setMenuVisible(true)} className="pl-3 pr-1" hitSlop={10}>
          <Entypo name="dots-three-vertical" size={20} color="#333" />
        </Pressable>
      </Pressable>

      <Modal
        transparent
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable onPress={() => setMenuVisible(false)} className="flex-1 bg-black/30 justify-end">
          <View className="bg-white p-6 rounded-t-2xl space-y-4 items-center">
            <View className="h-1 w-12 bg-gray-300 self-center rounded-full mb-2" />

            <Pressable
              onPress={() => {
                setMenuVisible(false);
                setMuteOptionsVisible(true);
              }}
              className="flex-row items-center space-x-2 py-3"
            >
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

      <Modal transparent visible={muteOptionsVisible} animationType="slide">
        <Pressable
          onPress={() => setMuteOptionsVisible(false)}
          className="flex-1 bg-black/30 justify-end"
        >
          <View className="bg-white p-6 rounded-t-2xl space-y-6 items-center">
            <View className="h-1 w-12 bg-gray-300 self-center rounded-full mb-2" />

            <Text className="text-lg font-semibold text-text-dark mb-2">Czas wyciszenia:</Text>

            <Pressable
              className="flex-row items-center space-x-3 py-3"
              onPress={() => console.log('15 minut')}
            >
              <MaterialIcons name="schedule" size={20} color="#1A5100 " />
              <Text className="text-base text-text-dark pl-3">15 minut</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center space-x-3 py-3"
              onPress={() => console.log('1 godzina')}
            >
              <MaterialIcons name="schedule" size={20} color="#1A5100" />
              <Text className="text-base text-text-dark pl-3">1 godzina</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center space-x-3 py-3"
              onPress={() => console.log('8 godzin')}
            >
              <MaterialIcons name="schedule" size={20} color="#1A5100 " />
              <Text className="text-base text-text-dark pl-3">8 godzin</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center space-x-3 py-3"
              onPress={() => console.log('Bezterminowo')}
            >
              <MaterialIcons name="pause-circle-outline" size={20} color="#1A5100 " />
              <Text className="text-base text-text-dark pl-3">Bezterminowo</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default ChatPreview;
