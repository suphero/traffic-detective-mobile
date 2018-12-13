import { AsyncStorage } from 'react-native';

const AUTH_TOKEN = 'AUTH_TOKEN';

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const saveToken = async (newToken) => {
  token = newToken;
  return await AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const removeToken = async () => {
  token = undefined;
  return await AsyncStorage.removeItem(AUTH_TOKEN);
};
