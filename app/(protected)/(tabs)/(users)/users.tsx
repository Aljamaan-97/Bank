import { getAllUsers } from "@/Api/auth";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, Image, Text, View } from "react-native";

const index = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 20,
        borderWidth: 1,
      }}
    >
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 10,
        }}
      />

      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "purple",
          fontWeight: "bold",
        }}
      >
        {" "}
        username
      </Text>

      <Button title="transfer" onPress={() => {}} />
    </View>
  );
};

export default index;
