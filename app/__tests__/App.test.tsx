import React from 'react';
import { render } from '@testing-library/react-native';
import App from "../App";

describe('App', () => {
  test('renders App component without crashing', () => {
    jest.mock("../global.css", () => ({}));
    const { getByTestId } = render(<App />);
    expect(getByTestId('App:SafeAreaProvider:AppContainer')).toBeTruthy();
  });
});
