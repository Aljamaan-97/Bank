import { deleteToken, isBiometricEnabled } from "@/Api/store";
import AuthContext from "@/context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LogOut: React.FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    const bioFlag = await isBiometricEnabled();

    /* إذا كانت البصمة مفعَّلة، نسأل المستخدم إن كان يريد حذف التوكِن */
    if (bioFlag) {
      Alert.alert(
        "Logout",
        "Do you also want to remove biometric login?",
        [
          {
            text: "Keep",
            onPress: () => setIsAuthenticated(false), // لا نحذف التوكِن
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: async () => {
              await deleteToken(); // حذف التوكِن فعليًا
              setIsAuthenticated(false);
            },
          },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    } else {
      /* البصمة غير مفعَّلة → نحذف التوكِن مباشرة */
      Alert.alert("Logout", "You are about to logout?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          style: "destructive",
          onPress: async () => {
            await deleteToken();
            setIsAuthenticated(false);
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
        <Entypo name="log-out" size={18} color="#1E3D58" />
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;

/* ----------------- styles ----------------- */
const styles = StyleSheet.create({
  container: { alignItems: "center" },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#1E3D58",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  btnText: {
    color: "#1E3D58",
    fontSize: 16,
    fontWeight: "700",
  },
});
