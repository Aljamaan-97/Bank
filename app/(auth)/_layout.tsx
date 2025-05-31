import { Stack } from "expo-router";
import React from "react";

const protectedLayout = () => {
  return (
    // screenOptions={{ headerShown: false }}
    <Stack>
      <Stack.Screen name="Login" options={{ title: "Login" }} />
      <Stack.Screen name="Register" options={{ title: "Register" }} />
    </Stack>
  );
};
export default protectedLayout;
