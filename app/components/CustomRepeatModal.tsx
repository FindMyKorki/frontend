import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native';
import TopPanel from './TopPanel';
import AppButton from '../components/AppButton';
import { Entypo } from '@expo/vector-icons';
import { format, setHours, subDays } from 'date-fns';
import { pl } from 'date-fns/locale';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Platform } from 'react-native';

const frequencies = ['dzień', 'tydzień', 'miesiąc'];
const frequencyEn = ['DAILY', 'WEEKLY', 'MONTHLY'];
const days = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];
const daysEn = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const monthMap: { [key: string]: number } = {
  stycznia: 0,
  lutego: 1,
  marca: 2,
  kwietnia: 3,
  maja: 4,
  czerwca: 5,
  lipca: 6,
  sierpnia: 7,
  września: 8,
  października: 9,
  listopada: 10,
  grudnia: 11,
};

type Props = {
  visible: boolean;
  initialRule: string;
  onClose: () => void;
  onSelect: (rule: string) => void;
};

const CustomRepeatModal = ({ visible, initialRule, onClose, onSelect }: Props) => {
  const [repeatEvery, setRepeatEvery] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [frequencyDropDown, setFrequencyDropDown] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([0]);
  //   const [showPicker, setShowPicker] = useState(false);
  //   const [date, setDate] = useState(new Date());
  const [ends, setEnds] = useState<'never' | 'onDate'>('never');
  const [endDate, setEndDate] = useState(format(new Date(), 'dd MMMM yyyy', { locale: pl }));

  useEffect(() => {
    if (!initialRule) return;
    if (initialRule == 'CUSTOM') return;
    const parts = initialRule.split(';');
    if (parts[0]) setFrequency(frequencyEn.indexOf(parts[0].split('=')[1]));
    if (parts[1]) setRepeatEvery(Number(parts[1].split('=')[1]));
    if (parts[2])
      setSelectedDays(
        parts[2]
          .split('=')[1]
          .split(',')
          .map((d) => daysEn.indexOf(d)),
      );
    if (parts[3]) {
      setEnds('onDate');
      const isoStr = parts[3]
        .split('=')[1]
        .split('T')[0]
        .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      const ndate = new Date(isoStr);
      setEndDate(format(ndate, 'dd MMMM yyyy', { locale: pl }));
    }
  }, []);

  const toggleDay = (index: number) => {
    setSelectedDays((prev) =>
      prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index],
    );
  };

  const manageSelect = () => {
    if (selectedDays.length === 0 || repeatEvery === 0) return;
    let rule = `FREQ=${frequencyEn[frequency]};INTERVAL=${repeatEvery};BYDAY=${selectedDays.map((d) => daysEn[d]).join(',')}`;
    if (ends === 'onDate') {
      try {
        const [dayStr, monthName, yearStr] = endDate.split(/\s+/);
        const date = new Date(Number(yearStr), monthMap[monthName], Number(dayStr), 23, 59, 59);
        rule += `;UNTIL=${format(date, 'yyyyMMdd', { locale: pl })}T${format(date, 'HHmmss', { locale: pl })}Z`;
      } catch (error) {
        console.error('Źle wpisana data zakończenia: ', error);
        return;
      }
    }
    onSelect(rule);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <TopPanel onBackPress={onClose} name={'Powtarzanie niestandardowe'} />
      <View className="flex-1 bg-background rounded-xl px-4 items-left">
        {/* Powtarzane co */}
        <Text className="font-['Inter'] font-regular text-text-dark text-sm mt-6">
          Powtarzane co
        </Text>

        <View className="flex-row items-start py-4 ">
          <TextInput
            value={String(repeatEvery)}
            keyboardType="numeric"
            onChangeText={(text) => setRepeatEvery(Number(text))}
            className="border border-border-gray px-2 py-1 rounded mr-3 text-center"
          />
          <View className="w-24">
            <Pressable
              className="flex-row justify-between border border-border-gray rounded px-2 py-1"
              onPress={() => setFrequencyDropDown(!frequencyDropDown)}
            >
              <Text className="font-['Inter'] font-regular text-text-dark text-base">
                {frequencies[frequency]}
              </Text>
              <Entypo name="triangle-down" size={20} color="black" />
            </Pressable>
            {frequencyDropDown && (
              <View className="border-2 border-border-gray">
                {frequencies.map((freq, index) => (
                  <Pressable onPress={() => setFrequency(index)} key={index}>
                    <Text className="font-['Inter'] font-medium text-text-dark text-base px-2 py-1">
                      {freq}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Dni tygodnia */}
        <Text className="font-['Inter'] font-regular text-text-dark text-sm mb-3">
          Powtarza się w
        </Text>
        <View className="flex-row mb-14">
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleDay(index)}
              className={`w-8 h-8 rounded-full items-center justify-center mr-5
                    ${selectedDays.includes(index) ? 'bg-primary' : 'border border-border-gray'}
                `}
            >
              <Text
                className={`${selectedDays.includes(index) ? 'text-background' : 'text-text-dark'}`}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Koniec */}
        <Text className="font-['Inter'] font-regular text-text-dark text-sm mb-3">Koniec</Text>
        <View className="flex-row">
          <TouchableOpacity onPress={() => setEnds('never')}>
            <View
              className={`w-6 h-6 rounded-full mr-6 flex items-center justify-center ${ends == 'never' ? 'bg-primary' : 'border border-border-gray'}`}
            >
              {ends == 'never' && <View className="w-2 h-2 rounded-full bg-background" />}
            </View>
          </TouchableOpacity>
          <Text className="font-['Inter'] font-regular text-text-dark text-base mb-3">Nigdy</Text>
        </View>

        <View className="flex-row">
          <TouchableOpacity onPress={() => setEnds('onDate')}>
            <View
              className={`w-6 h-6 rounded-full mr-6 flex items-center justify-center ${ends == 'onDate' ? 'bg-primary' : 'border border-border-gray'}`}
            >
              {ends == 'onDate' && <View className="w-2 h-2 rounded-full bg-background" />}
            </View>
          </TouchableOpacity>
          <Text className="font-['Inter'] font-regular text-text-dark text-base mr-3">W dniu</Text>
          {/* {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            setDate(selectedDate);
                        }
                        setShowPicker(false);
                        }}
                    />
                )} */}
          <TextInput
            value={endDate}
            editable={ends === 'onDate'}
            onChangeText={(text) => setEndDate(text)}
            className="border border-border-gray px-2 py-1 rounded w-32"
          />
        </View>
      </View>
      {/* Gotowe */}
      <View className="bg-background px-4 py-3 shadow-xl/70" style={{ elevation: 10 }}>
        <AppButton
          label="Gotowe"
          size="full"
          onPress={() => {
            manageSelect();
          }}
        />
      </View>
    </Modal>
  );
};

export default CustomRepeatModal;
