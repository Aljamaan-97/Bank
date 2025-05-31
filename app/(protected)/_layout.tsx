import AuthContext from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";

const protectedLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  // Check if the user is authenticated
  console.log("layougt isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    return <Redirect href="/Login" />;
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    );
  }
};
export default protectedLayout;
