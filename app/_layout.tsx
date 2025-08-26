import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import  Toast, { BaseToast, ErrorToast }  from "react-native-toast-message";

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isChecking, setIsChecking] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      if (isChecking) {
        router.replace('./home');
      } else {
        router.replace('/login');
      }
    };

    checkLogin();

  }, [isChecking , router]);

  
  const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ 
        borderLeftColor: "#009f9fff", // màu viền trái
        backgroundColor: "#009f9fff", // đổi nền
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff", // đổi màu chữ để nổi bật
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


  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig}/>
    </ThemeProvider>
  );
}
