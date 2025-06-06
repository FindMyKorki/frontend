import React, { useState, useEffect, FC, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { format, addMinutes } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import CustomRepeatModal from './CustomRepeatModal';
import { FontAwesome } from '@expo/vector-icons';

const MINLESSONTIME = 45;

type TimeRange = {
  start_time: Date;
  end_time: Date;
  recurrence_rule: string;
};

type TimeRangePickerType = {
  onAdd?: (range: TimeRange) => void;
  onDelete?: () => void;
  isEditable?: boolean;
  availabilities?: TimeRange;
  date: Date;
};

type OptionsModalType = {
  visible: boolean;
  rule: string;
  onExit: () => void;
  onSelect: (option: string) => void;
};

const TimeRangePicker: FC<TimeRangePickerType> = ({
  onAdd,
  onDelete,
  isEditable = false,
  availabilities,
  date,
}) => {
  const [from, setFrom] = useState<Date | null>(availabilities?.start_time || null);
  const [to, setTo] = useState<Date | null>(availabilities?.end_time || null);
  const [rule, setRule] = useState(availabilities?.recurrence_rule || '');
  const [fromVisible, setFromVisible] = useState(false);
  const [toVisible, setToVisible] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const [customModal, setCustomModal] = useState(false);
  const [endTimes, setEndTimes] = useState<string[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const FromRef = useRef<View>(null);
  const ToRef = useRef<View>(null);

  useEffect(() => {
    setEndTimes(generateHoursList('6:45', '23:45'));
  }, []);

  useEffect(() => {
    if (!from) {
      setEndTimes(generateHoursList('6:45', '23:45'));
      return;
    }
    const minEndTime = addMinutes(from, MINLESSONTIME);
    if (to && to < minEndTime) {
      setTo(null);
    }
    setEndTimes(generateHoursList(format(minEndTime, 'H:mm'), '23:45'));
  }, [from]);

  const parseTimeToDate = (time: string): Date => {
    const [hour, minute] = time.split(':').map(Number);
    const newTime = new Date(date);
    newTime.setHours(hour, minute, 0, 0);
    return newTime;
  };

  function generateHoursList(startTime: string, endTime: string): string[] {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const result: string[] = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let quarter = 0; quarter < 4; quarter++) {
        const minute = quarter * 15;

        if (
          (hour === startHour && minute < startMinute) ||
          (hour === endHour && minute > endMinute)
        ) {
          continue;
        }

        result.push(`${hour}:${minute.toString().padStart(2, '0')}`);
      }
    }

    return result;
  }

  const showDropdown = (ref: React.RefObject<View>) => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        setPosition({ x: pageX, y: pageY + 11 });
      });
    }
  };

  const manageRuleSelection = (selectedRule: string) => {
    setOptionsModal(false);
    if (selectedRule == 'CUSTOM') setCustomModal(true);
    else setRule(selectedRule);
  };

  return (
    <View className="flex-row items-center">
      {/* FROM */}
      <View className="flex-row">
        <View className="relative">
          <TouchableOpacity
            onPress={() => {
              showDropdown(FromRef);
              setFromVisible(true);
            }}
            ref={FromRef}
            disabled={!isEditable}
            className="bg-background-alt px-3 py-2 rounded-md w-40 flex-row mr-3"
          >
            <Text className="font-['Inter'] font-bold text-base text-text-grey">Od</Text>
            <View className="flex-1 items-center">
              <Text className="font-['Inter'] font-medium text-base text-text-dark">
                {from ? format(from, 'H:mm') : ''}
              </Text>
            </View>
          </TouchableOpacity>

          <Modal visible={fromVisible} transparent animationType="fade">
            <TouchableOpacity
              className="flex-1"
              onPress={() => {
                setFromVisible(false);
              }}
              activeOpacity={1}
            >
              <View
                className="bg-background rounded-xl shadow-lg w-40 max-h-48"
                style={{
                  position: 'absolute',
                  top: position.y,
                  left: position.x,
                }}
              >
                <ScrollView>
                  {generateHoursList('6:00', '23:00').map((h) => (
                    <TouchableOpacity
                      key={h}
                      onPress={() => {
                        setFromVisible(false);
                        setFrom(parseTimeToDate(h));
                      }}
                    >
                      <Text className="text-center text-text-dark py-2">{h}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        {/* TO */}
        <View className="relative">
          <TouchableOpacity
            onPress={() => {
              setToVisible(true);
            }}
            disabled={!isEditable}
            className="bg-background-alt px-3 py-2 rounded-md w-40 flex-row mr-2"
          >
            <Text className="font-['Inter'] font-bold text-base text-text-grey">Do</Text>
            <View className="flex-1 items-center">
              <Text className="font-['Inter'] font-medium text-base text-text-dark">
                {to ? format(to, 'H:mm') : ''}
              </Text>
            </View>
          </TouchableOpacity>

          <Modal visible={toVisible} transparent animationType="fade">
            <TouchableOpacity
              className="flex-1"
              onPress={() => setToVisible(false)}
              ref={ToRef}
              activeOpacity={1}
            >
              <View
                className="bg-background rounded-xl shadow-lg w-40 max-h-48"
                style={{
                  position: 'absolute',
                  top: position.y,
                  left: position.x + 150,
                }}
              >
                <ScrollView>
                  {endTimes.map((h) => (
                    <TouchableOpacity
                      key={h}
                      onPress={() => {
                        setToVisible(false);
                        setTo(parseTimeToDate(h));
                      }}
                    >
                      <Text className="text-center text-text-dark py-2">{h}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>

      {/* PLUS BUTTON */}
      <View className="flex-1 flex-row items-center justify-between">
        <View>
          {isEditable ? (
            <TouchableOpacity
              className="bg-primary w-9 h-9 rounded-full items-center justify-center"
              onPress={() =>
                to && from && onAdd?.({ start_time: from, end_time: to, recurrence_rule: rule })
              }
            >
              <Feather name="plus" size={27} color="#ffffff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onDelete} className="items-center">
              <Feather name="x" size={27} color="#000000" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => setOptionsModal(true)}
          className={to && from ? 'opacity-100' : 'opacity-0'}
          disabled={!to || !from || !isEditable}
        >
          {rule.length === 0 ? (
            <Feather name="more-vertical" size={27} color="#000000" />
          ) : (
            <FontAwesome name="repeat" size={27} color="#000000" />
          )}
        </TouchableOpacity>
      </View>

      <OptionsModal
        visible={optionsModal}
        rule={rule}
        onExit={() => setOptionsModal(false)}
        onSelect={(val) => manageRuleSelection(val)}
      />
      <CustomRepeatModal
        key={rule}
        visible={customModal}
        initialRule={rule}
        onClose={() => setCustomModal(false)}
        onSelect={(rule) => manageRuleSelection(rule)}
      />
    </View>
  );
};

const OptionsModal: FC<OptionsModalType> = ({ visible, rule, onExit, onSelect }) => {
  const options = [
    { rule: '', label: 'Nie powtarza się' },
    { rule: 'FREQ=DAILY;INTERVAL=1', label: 'Codziennie' },
    { rule: 'FREQ=WEEKLY;INTERVAL=1', label: 'Co tydzień' },
    { rule: 'FREQ=MONTHLY;INTERVAL=1', label: 'Co miesiąc' },
    { rule: 'CUSTOM', label: 'Niestandardowe' },
  ];

  function isCustom(rule: string) {
    if (
      rule === options[0].rule ||
      rule === options[1].rule ||
      rule === options[2].rule ||
      rule === options[3].rule
    )
      return false;
    else return true;
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end">
        <TouchableOpacity onPress={onExit} className="flex-1" />
        <View
          className="bg-background w-full justify-center text-center px-32 py-3 rounded-t-xl shadow-xl/70"
          style={{ elevation: 10 }}
        >
          <View className="bg-background-alt rounded-full self-center w-14 h-1" />

          {options.map((option) => {
            let isSelected = rule === option.rule || (option.label === 'CUSTOM' && isCustom(rule));

            return (
              <TouchableOpacity
                key={option.rule}
                className="flex-row items-center mt-6"
                onPress={() => {
                  onSelect(option.rule);
                }}
              >
                <View
                  className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${isSelected ? 'bg-primary' : 'border border-border-gray'}`}
                >
                  {isSelected && <View className="w-2 h-2 rounded-full bg-background" />}
                </View>
                <Text className="font-['Inter'] font-regular text-base text-text-dark">
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default TimeRangePicker;
