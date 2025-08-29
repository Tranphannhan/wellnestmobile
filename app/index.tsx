"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // lấy token trong store
        setTimeout(() => {
          if (token) {
            router.replace("/(tabs)/home"); // có token → vào home
          } else {
            router.replace("/login"); // không có token → login
          }
        }, 2000);
      } catch (error) {
        console.log("Lỗi khi đọc token:", error);
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logoAppWellnest.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Hệ thống quản lý quy trình khám bệnh</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // nền trắng
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250, 
    height: undefined, 
    aspectRatio: 1,
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
