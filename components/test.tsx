import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TransactionTabsProps {
  balance: number;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ balance }) => {
  // نفس المنطق السابق
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const numericAmount = parseFloat(amount);
  const isSendDisabled = !amount || numericAmount < 1 || isNaN(numericAmount);

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSend = () => {
    setErrorMessage("");
    if (activeTab === "withdraw" && numericAmount > balance) {
      setErrorMessage("الرصيد غير كافٍ");
      setHasError(true);
      triggerShake();
      return;
    }

    if (activeTab === "deposit") {
      console.log("Depositing:", numericAmount);
    } else {
      console.log("Withdrawing:", numericAmount);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* التبويبات */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "deposit" && styles.activeTab]}
          onPress={() => {
            setActiveTab("deposit");
            setErrorMessage("");
            setHasError(false);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "deposit" && styles.activeTabText,
            ]}
          >
            Deposit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "withdraw" && styles.activeTab]}
          onPress={() => {
            setActiveTab("withdraw");
            setErrorMessage("");
            setHasError(false);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "withdraw" && styles.activeTabText,
            ]}
          >
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      {/* حقل المبلغ مع تأثير الاهتزاز */}
      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <TextInput
          placeholder="Enter amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={amount}
          onChangeText={(value) => {
            setAmount(value);
            setErrorMessage("");
            setHasError(false);
          }}
          style={[styles.input, hasError && styles.inputError]}
        />
      </Animated.View>

      {/* رسالة الخطأ إذا وُجدت */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* زر الإرسال */}
      <TouchableOpacity
        onPress={handleSend}
        style={[styles.sendButton, isSendDisabled && styles.disabledButton]}
        disabled={isSendDisabled}
      >
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTabs;

/* --------------------------------- الأنماط --------------------------------- */
const COLORS = {
  primary: "#1E3D58",
  accent: "#00A8E8",
  lightText: "#FFFFFF",
  border: "#C5CED8",
  card: "#FFFFFF",
};

const styles = StyleSheet.create({
  /* 1. اللِّفه الكارت */
  cardContainer: {
    width: "90%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    alignSelf: "center",
    marginTop: 20,
    // ظل خفيف يشبه ProfileCard
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  /* 2. التبويبات */
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: "#444",
    fontWeight: "600",
  },
  activeTabText: {
    color: COLORS.lightText,
  },

  /* 3. حقل الإدخال */
  input: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  inputError: {
    borderColor: "red",
  },

  /* 4. رسالة الخطأ */
  errorText: {
    color: "red",
    marginTop: 8,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
  },

  /* 5. زر الإرسال */
  sendButton: {
    marginTop: 5,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#999",
  },
  sendButtonText: {
    color: COLORS.lightText,
    fontWeight: "700",
    fontSize: 16,
  },
});
