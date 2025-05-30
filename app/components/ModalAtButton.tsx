import { View, Pressable, Modal } from 'react-native';
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
  const buttonRef = useRef<View>(null);

  const showModal = () => {
    buttonRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
      setDropdownPosition({ top: pageY + _h + spaceBetween, left: pageX });
      setVisible(true);
    });
  };

  return (
    <>
      {cloneElement(button as ReactElement, { ref: buttonRef, onPress: showModal })}

      <Modal transparent visible={visible} animationType="fade">
        <Pressable className="flex-1 bg-black/30" onPress={() => setVisible(false)}>
          <View
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
