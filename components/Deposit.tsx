import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Deposit = () => {
  return (
    <View
      style={{
        height: 50,
        width: 400,
        backgroundColor: "lightgreen",
        marginLeft: 0,
        marginTop: 10,
      }}
    >
      <Text style={{ marginLeft: 100 }}>Deposit amount</Text>
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({});
