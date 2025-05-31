import { Stack } from "expo-router";
import React from "react";

const protectedLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};
export default protectedLayout;
