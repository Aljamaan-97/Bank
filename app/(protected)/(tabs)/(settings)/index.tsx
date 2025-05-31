import { isBiometricEnabled, setBiometricEnabled } from "@/Api/store";
import LogOut from "@/components/LogOut";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

/* لوحة الألوان الموحَّدة للتطبيق */
const COLORS = {
  primary: "#1E3D58",
  accent: "#00A8E8",
  lightText: "#FFFFFF",
  border: "#C5CED8",
  background: "#F4F6F9",
  socialIcon: "#1DA1F2", // لون أيقونات التواصل (تويتر كمثال)
};

/**
 * شاشة الإعدادات (Settings)
 * - تغيير صورة الملف الشخصي
 * - تفعيل / تعطيل تسجيل الدخول بالبصمة
 * - أزرار للتواصل الاجتماعي (واتساب، إنستقرام، إكس)
 */
const SettingsScreen: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [bioEnabled, setBioEnabled] = useState<boolean>(false);

  /* تحميل حالة البصمة عند فتح الشاشة */
  useEffect(() => {
    (async () => {
      const flag = await isBiometricEnabled();
      setBioEnabled(flag);
    })();
  }, []);

  /* تغيير صورة البروفايل */
  const pickAvatar = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!res.canceled) {
      setAvatar(res.assets[0].uri);
    }
  };

  /* تبديل البصمة */
  const toggleBiometric = async (value: boolean) => {
    setBioEnabled(value);
    await setBiometricEnabled(value);
  };

  /* دوال فتح الروابط للتواصل الاجتماعي */
  const openWhatsApp = () => {
    // هنا ضع رابط واتساب الخاص بك (قد يكون رابط محادثة)
    const url = "https://wa.me/1234567890";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open WhatsApp:", err)
    );
  };
  const openInstagram = () => {
    // ضع رابط حساب إنستقرام
    const url = "https://instagram.com/your_username";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Instagram:", err)
    );
  };
  const openX = () => {
    // ضع رابط حساب إكس (تويتر سابقًا)
    const url = "https://twitter.com/your_username";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open X/Twitter:", err)
    );
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
            {/* أيقونة العنوان */}
            <Ionicons
              name="settings"
              size={64}
              color={COLORS.accent}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.title}>الإعدادات</Text>

            {/* صورة الملف الشخصي */}
            <TouchableOpacity style={styles.avatarWrapper} onPress={pickAvatar}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <Ionicons name="camera" size={28} color={COLORS.lightText} />
              )}
            </TouchableOpacity>
            <Text style={styles.sectionLabel}>صورة الملف الشخصي</Text>

            {/* مفتاح البصمة */}
            <View style={styles.row}>
              <Text style={styles.rowLabel}>تسجيل الدخول بالبصمة</Text>
              <Switch value={bioEnabled} onValueChange={toggleBiometric} />
            </View>

            {/* قسم التواصل الاجتماعي */}
            <View style={styles.socialContainer}>
              <Text style={styles.sectionLabel}>تواصل معنا عبر</Text>

              <View style={styles.socialRow}>
                {/* واتساب */}
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={openWhatsApp}
                >
                  <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
                  <Text style={styles.socialText}>واتساب</Text>
                </TouchableOpacity>

                {/* إنستقرام */}
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={openInstagram}
                >
                  <Ionicons name="logo-instagram" size={32} color="#C13584" />
                  <Text style={styles.socialText}>إنستقرام</Text>
                </TouchableOpacity>

                {/* إكس (تويتر) */}
                <TouchableOpacity style={styles.socialButton} onPress={openX}>
                  <Ionicons
                    name="logo-twitter"
                    size={32}
                    color={COLORS.socialIcon}
                  />
                  <Text style={styles.socialText}>إكس</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* زر تسجيل الخروج */}
            <LogOut />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SettingsScreen;

/* --------------------- الأنماط --------------------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 16,
  },
  avatarWrapper: {
    backgroundColor: COLORS.primary,
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
    // إضافة ظل بسيط للآفتر بقاعدة أندرويد و iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // لأندرويد
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 16,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  rowLabel: {
    fontSize: 16,
    color: COLORS.primary,
  },
  socialContainer: {
    width: "100%",
    marginTop: 32,
    marginBottom: 24,
    alignItems: "center",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 8,
  },
  socialButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    backgroundColor: COLORS.lightText,
    borderRadius: 12,
    // ظل بسيط لكل زر
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  socialText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
  },
});
