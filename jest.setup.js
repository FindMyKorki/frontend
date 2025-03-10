jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  const mockNav = {
    navigate: jest.fn(),
    replace: jest.fn(),
    getState: jest.fn(() => ({routes: [{name: "Home"}]})),
  };
  return {
    ...actual,
    useTheme: () => actual.DarkTheme,
    useNavigation: jest.fn(() => mockNav),
  };
});