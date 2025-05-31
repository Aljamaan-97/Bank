import { login } from "@/Api/auth";
import {
  isBiometricEnabled,
  setBiometricEnabled,
  storeToken,
} from "@/Api/store";
import AuthContext from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import * as LocalAuth from "expo-local-authentication";
import { Redirect, router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

/* ----------------------------- لوحة الألوان الموحدة ----------------------------- */
const COLORS = {
  primary: "#1E3D58", // أزرق كحلي يناسب بنك
  accent: "#00A8E8", // أزرق سماوي مضيء
  lightText: "#FFFFFF",
  border: "#C5CED8",
  background: "#F4F6F9",
};

export default function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [canBio, setCanBio] = useState(false);

  /* التحقق إن كان يمكن استخدام البصمة */
  useEffect(() => {
    (async () => {
      const ready =
        (await LocalAuth.hasHardwareAsync()) &&
        (await LocalAuth.isEnrolledAsync()) &&
        (await isBiometricEnabled());
      setCanBio(ready);
    })();
  }, []);

  /* استدعاء TanStack Query */
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login({ username: userName, password }),

    onError: () => Alert.alert("error", "wrong username or password"),

    onSuccess: async (data) => {
      await storeToken(data.token);
      Alert.alert(
        "Activate Biometric",
        "do you want to use biometric login?",
        [
          { text: "later", style: "cancel", onPress: finalize },
          {
            text: "yes",
            onPress: async () => {
              await setBiometricEnabled(true);
              setCanBio(true);
              finalize();
            },
          },
        ],
        { cancelable: false }
      );
    },
  });

  const finalize = () => {
    setIsAuthenticated(true);
    router.replace("/(protected)/(tabs)/(home)");
  };

  /* التحقق بالبصمة */
  const handleBiometric = async () => {
    const { success } = await LocalAuth.authenticateAsync({
      promptMessage: "logim using biometric",
      cancelLabel: "cancel",
      disableDeviceFallback: true,
    });
    if (success) finalize();
  };

  const handleLogin = () => {
    if (!userName || !password)
      return Alert.alert("alert", "please fill all fields");
    mutate();
  };

  if (isAuthenticated) return <Redirect href="/(protected)/(tabs)/(home)" />;

  /* --------------------------------- JSX --------------------------------- */
  return (
    <SafeAreaView style={styles.safe}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Ionicons
              name="cash-outline"
              size={64}
              color={COLORS.accent}
              style={styles.logo}
            />
            <Text style={styles.title}>Friends Bank</Text>
            <Text style={styles.subtitle}>login to procced to the app</Text>

            {canBio && (
              <TouchableOpacity style={styles.bioBtn} onPress={handleBiometric}>
                <Ionicons
                  name="finger-print-outline"
                  size={28}
                  color={COLORS.lightText}
                />
              </TouchableOpacity>
            )}

            <TextInput
              placeholder="Username"
              placeholderTextColor={COLORS.border}
              style={styles.input}
              autoCapitalize="none"
              value={userName}
              onChangeText={setUserName}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={COLORS.border}
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={[styles.primaryBtn, isPending && styles.btnDisabled]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={isPending}
            >
              <Ionicons
                name="log-in-outline"
                size={20}
                color={COLORS.lightText}
              />
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.switchWrapper}>
              <Text>Need an account? </Text>
              <TouchableOpacity onPress={() => router.replace("./Register")}>
                <Text style={styles.link}>Register</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

/* ------------------------------- أنماط موحّدة ------------------------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120,
  },
  logo: { marginBottom: 12 },
  title: { fontSize: 26, fontWeight: "700", color: COLORS.primary },
  subtitle: { fontSize: 14, color: COLORS.primary, marginBottom: 24 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: COLORS.lightText,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 34,
    borderRadius: 30,
    marginTop: 8,
  },
  btnText: { color: COLORS.lightText, fontWeight: "600", fontSize: 16 },
  btnDisabled: { opacity: 0.6 },
  link: { color: COLORS.accent, textDecorationLine: "underline" },
  switchWrapper: { flexDirection: "row", marginTop: 18 },
  bioBtn: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 40,
    marginBottom: 24,
  },
});
