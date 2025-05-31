import { getToken } from "@/Api/store";
import AuthContext from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  const queryClient = new QueryClient();

  const checkToken = async () => {
    const token = await getToken();
    console.log("token", token);
    if (token) {
      setIsAuthenticated(true);
    }
    // setReady(true);
  };

  console.log(isAuthenticated, "isAuthenticated");

  if (!ready) {
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text>LOADING APP</Text>
    </View>;
  }
  useEffect(() => {
    checkToken();
    setReady(true);
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
