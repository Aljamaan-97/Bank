import * as SecureStore from "expo-secure-store";

export const TOKEN_KEY = "token";
export const BIOMETRIC_KEY = "biometricEnabled";

/*auth token*/
export const storeToken = async (token: string) =>
  SecureStore.setItemAsync(TOKEN_KEY, token);
export const getToken = () => SecureStore.getItemAsync(TOKEN_KEY);
export const deleteToken = () => SecureStore.deleteItemAsync(TOKEN_KEY);

/*  bio flag */
export const setBiometricEnabled = async (enable: boolean) =>
  SecureStore.setItemAsync(BIOMETRIC_KEY, enable.toString());
export const isBiometricEnabled = async () =>
  (await SecureStore.getItemAsync(BIOMETRIC_KEY)) === "true";
export const deleteBiometricFlag = () =>
  SecureStore.deleteItemAsync(BIOMETRIC_KEY);
