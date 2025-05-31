import { register } from "@/Api/auth";
import { setBiometricEnabled, storeToken } from "@/Api/store";
import AuthContext from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
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

const COLORS = {
  primary: "#1E3D58",
  accent: "#00A8E8",
  lightText: "#FFFFFF",
  border: "#C5CED8",
  background: "#F4F6F9",
};

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(name, password, image || ""),
    onError: () => Alert.alert("خطأ", "تعذّر إنشاء الحساب"),
    onSuccess: async (data) => {
      if (data.token) await storeToken(data.token);
      Alert.alert(
        "تفعيل البصمة",
        "هل ترغب باستخدام البصمة لتسجيل الدخول؟",
        [
          { text: "Later", style: "cancel", onPress: finalize },
          {
            text: "Enable",
            onPress: async () => {
              await setBiometricEnabled(true);
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

  const handleRegister = () => {
    if (!name || !password) return Alert.alert("تنبيه", "أدخل البيانات");
    mutate();
  };

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
            <Text style={styles.subtitle}>إنشاء حساب جديد</Text>

            {/* صورة الملف الشخصي */}
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <View style={styles.avatarWrapper}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.avatar} />
                ) : (
                  <Ionicons name="camera" size={28} color={COLORS.lightText} />
                )}
              </View>
            </TouchableOpacity>

            <TextInput
              placeholder="Username"
              placeholderTextColor={COLORS.border}
              style={styles.input}
              autoCapitalize="none"
              value={name}
              onChangeText={setName}
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
              onPress={handleRegister}
              activeOpacity={0.85}
              disabled={isPending}
            >
              <Ionicons
                name="person-add-outline"
                size={20}
                color={COLORS.lightText}
              />
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.switchWrapper}>
              <Text>Have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("./Login")}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Register;

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
  avatarWrapper: {
    backgroundColor: COLORS.border,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
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
});
