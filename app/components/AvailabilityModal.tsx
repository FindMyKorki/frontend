import React, { FC } from 'react';
import { Text, Modal, Pressable } from 'react-native';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

type TimeRange = {
  start_date: string;
  end_date: string;
};

type AvailabilityModalType = {
  visible: boolean;
  onClose: () => void;
  selectedDate: Date;
  dates: TimeRange[];
  top: number;
};

const AvailabilityModal: FC<AvailabilityModalType> = ({
  visible,
  onClose,
  selectedDate,
  dates,
  top,
}) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <Pressable onPress={onClose} className="items-center bg-black/10 flex-1">
        <Pressable
          onPress={() => {}}
          className="justify-start rounded-lg px-6 py-4 bg-background shadow-xl/70"
          style={{ elevation: 10, top }}
        >
          <Text className="text-left text-primary font-semibold font-['Inter'] text-lg mb-2.5">
            {format(selectedDate, 'd LLLL yyyy', { locale: pl }).toLowerCase()}
          </Text>

          {dates.map((date, index) => {
            const start = format(date.start_date, 'HH:mm');
            const end = format(date.end_date, 'HH:mm');
            return (
              <Text
                key={index}
                className={`text-left text-lg font-['Inter'] font-medium text-text-light ${index !== 0 ? 'mt-3' : ''}`}
              >
                {start} - {end}
              </Text>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AvailabilityModal;
