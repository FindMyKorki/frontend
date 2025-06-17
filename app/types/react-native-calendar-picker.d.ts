// src/@types/react-native-calendar-picker.d.ts
declare module 'react-native-calendar-picker' {
  import { Component } from 'react';
  import { StyleProp, ViewStyle, TextStyle } from 'react-native';

  export interface CalendarPickerProps {
    startFromMonday?: boolean;
    allowRangeSelection?: boolean;
    initialDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    todayBackgroundColor?: string;
    selectedDayColor?: string;
    selectedDayTextColor?: string;
    scaleFactor?: number;

    selectedStartDate?: Date;
    selectedEndDate?: Date;
    selectedDate?: Date;

    onDateChange?: (date: Date, type?: 'START_DATE' | 'END_DATE') => void;

    weekdays?: Array<string>;
    months?: Array<string>;
    previousTitle?: string;
    nextTitle?: string;
    previousTitleStyle?: StyleProp<TextStyle>;
    nextTitleStyle?: StyleProp<TextStyle>;

    // Styles for data range
    selectedRangeStartStyle?: StyleProp<ViewStyle>;
    selectedRangeEndStyle?: StyleProp<ViewStyle>;
    selectedRangeStyle?: StyleProp<ViewStyle>;

    // Styles for single dates
    selectedDayStyle?: StyleProp<ViewStyle>;
    selectedDayTextStyle?: StyleProp<TextStyle>;

    customDatesStyles?: Array<{
      date: Date;
      style?: StyleProp<ViewStyle>;
      textStyle?: StyleProp<TextStyle>;
    }>;

    // Additional properties
    disabledDates?: Date[];
    disabledDatesTextStyle?: StyleProp<TextStyle>;
    enableDateChange?: boolean;
    restrictMonthNavigation?: boolean;
    textStyle?: StyleProp<TextStyle>;
    headerWrapperStyle?: StyleProp<ViewStyle>;
    monthTitleStyle?: StyleProp<TextStyle>;
    yearTitleStyle?: StyleProp<TextStyle>;
    dayLabelsWrapper?: StyleProp<ViewStyle>;
    dayOfWeekStyles?: StyleProp<TextStyle>;
  }

  export default class CalendarPicker extends Component<CalendarPickerProps> {}
}
