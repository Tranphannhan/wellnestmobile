import { signInUnified } from "@/services/login";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [secure, setSecure] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const HandleLogin = useCallback(async () => {
    if (!emailOrPhone || !password) {
      Toast.show({
        type: "error",
        text1: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }

    try {
      setLoading(true);
      await signInUnified(emailOrPhone, password);

      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
      });

      router.replace("/home");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2: err?.message || "Sai tài khoản hoặc mật khẩu",
      });
    } finally {
      setLoading(false);
    }
  }, [emailOrPhone, password]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* <Image
          source={require("@/assets/images/logoAppWellnest.png")}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 20,
            height: 90,
            justifyContent: "center",
            alignItems: "center", // ảnh nằm giữa
            overflow: "hidden", // tránh ảnh tràn borderRadius
          }}
        >
          <Image
            source={require("@/assets/images/logoAppWellnest.png")}
            style={{ width: "80%", height: "100%" }} // chiếm 80% chiều rộng, co theo chiều cao
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Form */}
      <View style={styles.formWrapper}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Đăng nhập</Text>

          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại hoặc email"
            placeholderTextColor="#888"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#888"
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? "eye-off" : "eye"}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={HandleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.loginText}>Đang xử lý...</Text>
              </>
            ) : (
              <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#00adbdff",
          width: 1000,
          height: 1000,
          borderRadius: 1000,
          margin: "auto",
          right: "-70%",
          position: "absolute",
          top: "85%",
        }}
      ></View>
      <View
        style={{
          backgroundColor: "#007A86",
          width: 1000,
          height: 1000,
          borderRadius: 1000,
          margin: "auto",
          right: "-65%",
          position: "absolute",
          top: "86%",
        }}
      ></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f9" },

  header: {
    backgroundColor: "#007A86",
    alignItems: "center",
    paddingBottom: 200,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
  logo: { top: 0, width: 200, borderRadius: 100, marginBottom: 10 },
  appName: { color: "#fff", fontSize: 22, fontWeight: "bold" },

  formWrapper: {
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    transform: [{ translateY: -200 }],
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  passwordInput: { flex: 1 },
  loginButton: {
    backgroundColor: "#007A86",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#007A86",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  forgotText: {
    textAlign: "center",
    marginTop: 10,
    color: "#007A86",
    fontWeight: "500",
  },
});
