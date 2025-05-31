import Deposit from "@/components/Deposit";
import Transfer from "@/components/Transfers";
import Withdraw from "@/components/Withdraw";
import React from "react";
import { Text, View } from "react-native";

const transaction = () => {
  return (
    <View>
      <Text>transaction page</Text>
      <View
        style={{
          height: 500,
          width: 400,
          backgroundColor: "lightblue",
          marginLeft: 20,
          marginTop: 200,
        }}
      >
        <Withdraw />
        <Deposit />
        <Transfer />
      </View>
    </View>
  );
};

export default transaction;
