import React from "react";
import { Text, View } from "react-native";

const Withdraw = () => {
  return (
    <View
      style={{
        height: 50,
        width: 400,
        backgroundColor: "red",
        marginLeft: 0,
        marginTop: 10,
      }}
    >
      <Text style={{ marginLeft: 100 }}>Withdraw amount</Text>
    </View>
  );
};

export default Withdraw;
