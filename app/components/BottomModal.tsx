import React, { ReactNode, FC, useRef, useEffect } from 'react';
import { View, Pressable, Modal, Animated } from 'react-native';

type BottomModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children?: ReactNode;
};

const BottomModal: FC<BottomModalProps> = ({ visible, setVisible, children }) => {
  const slideAnim = useRef(new Animated.Value(500)).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  useEffect(() => {
    if (visible) {
      slideIn();
    } else {
      slideOut();
    }
  }, [visible]);

  return (
    <>
      <Modal transparent visible={visible} animationType="fade">
        <Pressable
          className="flex-1 flex-col bg-black/30 justify-end"
          onPress={() => setVisible(false)}
        >
          <Animated.View
            className="bg-background rounded-t-2xl shadow-lg pb-12"
            style={{
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View className="items-center">
              <View className="h-1 bg-background-alt w-14 my-5 rounded-full" />
            </View>

            {children}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
};

export default BottomModal;
