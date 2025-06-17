import { View, Pressable, Modal, Dimensions } from 'react-native';
import React, { useState, FC, useRef, ReactNode, cloneElement, ReactElement } from 'react';

type ModalAtButtonProps = {
  spaceBetween: number;
  button: ReactNode;
  children?: ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const ModalAtButton: FC<ModalAtButtonProps> = ({
  spaceBetween,
  button,
  children,
  visible,
  setVisible,
}) => {
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [buttonCoords, setButtonCoords] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const buttonRef = useRef<View>(null);

  const showModal = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setButtonCoords({ x, y, width, height });
      setVisible(true);
    });
  };

  const handleDropdownLayout = (event: any) => {
    const { width: dropdownWidth, height: dropdownHeight } = event.nativeEvent.layout;
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    let top = buttonCoords.y + buttonCoords.height + spaceBetween;
    let left = buttonCoords.x;

    if (top + dropdownHeight > screenHeight) {
      top = Math.max(0, buttonCoords.y - dropdownHeight - spaceBetween);
    }

    if (left + dropdownWidth > screenWidth) {
      left = Math.max(0, screenWidth - dropdownWidth - 10);
    }

    setDropdownPosition({ top, left });
  };

  return (
    <>
      {cloneElement(button as ReactElement, { ref: buttonRef, onPress: showModal })}

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable className="flex-1 bg-black/30" onPress={() => setVisible(false)}>
          <View
            onLayout={handleDropdownLayout}
            className="absolute bg-background rounded-md shadow-md"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
          >
            {children}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default ModalAtButton;
