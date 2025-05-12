jest.mock('../global.css', () => ({}));

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  test('renders App component without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('App:SafeAreaProvider:AppContainer')).toBeTruthy();
  });
});
