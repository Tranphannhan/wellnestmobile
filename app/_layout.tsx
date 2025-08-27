import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setInitialRoute("(tabs)"); // hoặc "home"
        } else {
          setInitialRoute("login");
        }
      } catch (err) {
        console.error("Lỗi kiểm tra login:", err);
        setInitialRoute("login");
      }
    };

    checkLogin();
  }, []);

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#009f9fff",
          backgroundColor: "#009f9fff",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "bold",
          color: "#fff",
        }}
        text2Style={{
          fontSize: 13,
          color: "#fff",
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "red", backgroundColor: "red" }}
        text1Style={{ color: "#fff" }}
        text2Style={{ color: "#fff" }}
      />
    ),
  };

  if (!initialRoute) {
    // show splash/loading screen
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
