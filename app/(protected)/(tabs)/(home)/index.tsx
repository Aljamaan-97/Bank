import { getMyProfile } from "@/Api/auth";
import ProfileCard from "@/components/ProfileCard";
import TransactionTabs from "@/components/test";
import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#1E3D58", // أزرق كحلي يناسب بنك
  accent: "#00A8E8", // أزرق سماوي مضيء
  lightText: "#FFFFFF",
  border: "#C5CED8",
  background: "#F4F6F9",
};

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E3D58" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#1E3D58" }}>حدث خطأ أثناء جلب البيانات</Text>
      </View>
    );
  }

  // بعدما تمّ تحميل الملف الشخصي بنجاح:
  const balance = data.balance ?? 0;

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
            <ProfileCard />

            {/* <Switch style={{}} />
            <Text style={styles.title}>Deposit & Withdrow</Text>

            <TextInput
              placeholder="Amount"
              placeholderTextColor={COLORS.border}
              style={styles.input}
              autoCapitalize="none"
              // value={userName}
              // onChangeText={setUserName}
            />

            <TouchableOpacity
              style={[styles.primaryBtn, styles.btnDisabled]}
              // onPress={handleLogin}
              activeOpacity={0.85}
              // disabled={isPending}
            >
              <Ionicons
                name="log-in-outline"
                size={20}
                color={COLORS.lightText}
              />
              <Text style={styles.btnText}>Submit</Text>
           
            </TouchableOpacity> */}
            <TransactionTabs balance={balance} />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120,
  },
  logo: { marginBottom: 12 },
  title: { fontSize: 26, fontWeight: "700", color: COLORS.primary, margin: 10 },
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
