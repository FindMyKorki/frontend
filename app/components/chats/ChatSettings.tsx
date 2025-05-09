import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

export type ChatSettingsProps = {
  triggerClassName?: string;
};

//{ chatId, chatName }: { chatId: string, chatName: string }
const ChatSettings = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [muteOptionsVisible, setMuteOptionsVisible] = useState(false);

  // const handleMute = (duration: string) => {
  //     console.log(`Wyciszam czat ${chatId} (${chatName}) na ${duration}`);
  //     // Tu bede wyciszac
  // };

  return (
    <>
      {/* Przycisk do otwarcia menu */}
      <Pressable onPress={() => setMenuVisible(true)}>
        <Entypo name="dots-three-vertical" size={20} color="#000" />
      </Pressable>

      {/* Główne menu */}
      <Modal transparent visible={menuVisible} animationType="slide">
        <Pressable onPress={() => setMenuVisible(false)} className="flex-1 bg-black/30 justify-end">
          <View className="bg-white p-6 rounded-t-2xl space-y-6 items-center">
            <View className="h-1 w-12 bg-gray-300 self-center rounded-full mb-2" />

            <Pressable
              className="flex-row items-center space-x-2"
              onPress={() => {
                setMenuVisible(false);
                setMuteOptionsVisible(true);
              }}
            >
              <MaterialIcons name="notifications-off" size={20} color="#1A5100" />
              <Text className="text-base text-text-dark">Wycisz</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center space-x-2"
              onPress={() => console.log('Archiwizuj')}
            >
              <Entypo name="download" size={20} color="#1A5100" />
              <Text className="text-base text-text-dark">Archiwizuj</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center space-x-2"
              onPress={() => console.log('Zgłoś')}
            >
              <Entypo name="flag" size={20} color="#1A5100" />
              <Text className="text-base text-text-dark">Zgłoś</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Submenu: czas wyciszenia */}
      <Modal transparent visible={muteOptionsVisible} animationType="slide">
        <Pressable
          onPress={() => setMuteOptionsVisible(false)}
          className="flex-1 bg-black/30 justify-end"
        >
          <View className="bg-white p-6 rounded-t-2xl space-y-6 items-center">
            <View className="h-1 w-12 bg-gray-300 self-center rounded-full mb-2" />

            <Text className="text-lg font-semibold text-text-dark mb-2">Czas wyciszenia:</Text>

            <Pressable
              className="flex-row items-center space-x-3"
              onPress={() => console.log('15 minut')}
            >
              <MaterialIcons name="schedule" size={20} color="#1A5100" />
              <Text className="text-base text-text-dark">15 minut</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center space-x-3"
              onPress={() => console.log('1 godzina')}
            >
              <MaterialIcons name="schedule" size={20} color="#1A5100" />
              <Text className="text-base text-text-dark">1 godzina</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center space-x-3"
              onPress={() => console.log('8 godzin')}
            >
              <MaterialIcons name="schedule" size={20} color="#1A5100" />
              <Text className="text-base text-text-dark">8 godzin</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center space-x-3"
              onPress={() => console.log('Bezterminowo')}
            >
              <MaterialIcons name="pause-circle-outline" size={20} color="#1A5100" />
              <Text className="text-base text-text-dark">Bezterminowo</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default ChatSettings;
