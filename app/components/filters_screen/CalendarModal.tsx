import { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AppButton from '../AppButton';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  selectedDate: Date;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
};

const CalendarModal = ({ visible, selectedDate, onClose, onSelectDate }: Props) => {
  const [tempDate, setTempDate] = useState<Date>(selectedDate);

  useEffect(() => {
    setTempDate(selectedDate);
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/60">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-medium">Wybierz datę</Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <MaterialIcons name="close" size={20} />
            </TouchableOpacity>
          </View>

          <CalendarPicker
            startFromMonday
            selectedStartDate={tempDate}
            onDateChange={(date) => setTempDate(date)}
            minDate={new Date()}
            selectedDayColor="#1A5100"
            selectedDayTextColor="#ffffff"
          />

          <AppButton
            label="Zatwierdź"
            size="full"
            onPress={() => {
              onSelectDate(tempDate);
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
