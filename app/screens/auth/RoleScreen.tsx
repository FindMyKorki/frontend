import React, { FC, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Role from '../../../assets/role.svg';
import AppButton from '../../components/AppButton';
import { createProfile } from '../../hooks/useApi';
import { useAuth } from '../../utils/AuthProvider';

type RoleScreenProps = {
  getSession: () => Promise<void>;
};

const RoleScreen: FC<RoleScreenProps> = ({ getSession }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>('student');

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
  };

  const handleNextButtonPress = async () => {
    setLoading(true);
    await createProfile(role !== 'student');
    await getSession();
    setLoading(false);
  };

  return (
    <View className={'flex-1 items-center bg-white'}>
      <View className="flex-1 items-center justify-end p-def-x">
        <Role height={'80%'} />
      </View>
      <View className="flex-1 items-center p-def-x">
        <Text className="text-[1.5rem] font-bold mb-5">Wybierz swoją rolę!</Text>

        <View className="mb-5">
          <RadioButton.Group onValueChange={handleRoleChange} value={role}>
            <Pressable
              className={`flex-row items-center pt-0 p-1 ${loading ? 'opacity-50' : ''}`}
              onPress={() => !loading && handleRoleChange('teacher')}
              disabled={loading}
            >
              <RadioButton value="teacher" color={'#1A5100'} disabled={loading} />
              <Text className="ml-2">Jestem nauczycielem</Text>
            </Pressable>

            <Pressable
              className={`flex-row items-center p-1 ${loading ? 'opacity-50' : ''}`}
              onPress={() => !loading && handleRoleChange('student')}
              disabled={loading}
            >
              <RadioButton value="student" color={'#1A5100'} disabled={loading} />
              <Text className="ml-2">Jestem uczniem/rodzicem</Text>
            </Pressable>
          </RadioButton.Group>
        </View>

        <AppButton
          label="Dalej"
          className="px-8 self-center"
          disabled={loading}
          loading={loading}
          onPress={handleNextButtonPress}
        />
      </View>
    </View>
  );
};

export default RoleScreen;
