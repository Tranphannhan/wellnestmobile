import { SearchScanQrCode } from "@/services/lookup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export default function QrScanner() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState("");

  useFocusEffect(
    useCallback(() => {
      const clearStorage = async () => {
        await AsyncStorage.removeItem("PatientInformation");
        console.log("✅ Đã xóa PatientInformation khi vào lại QrScanner");
      };
      clearStorage();
    }, [])
  );

  // Animation cho tia laser
  const animatedValue = useState(new Animated.Value(0))[0];
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 220,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Ứng dụng cần quyền truy cập camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 🔹 Hàm parse dữ liệu từ QR (hoàn thiện cho cả 2 format)
  const parseQrData = (raw: string) => {
    let cccd = "";
    let hoTen = "";
    let ngaySinh = "";
    let gioiTinh = "";
    let diaChi = "";


    if (raw.includes("||")) {
      // Format 1: cccd||hoTen|ngaySinh|gioiTinh|diaChi|ngayCap
      const [cccdPart, infoPart] = raw.split("||");
      const info = infoPart ? infoPart.split("|") : [];
      cccd = cccdPart || "";
      hoTen = info[0] || "";
      ngaySinh = info[1] || "";
      gioiTinh = info[2] || "";
      diaChi = info[3] || "";
    } else {
      // Format 2: cccd|soThe|hoTen|ngaySinh|gioiTinh|diaChi|ngayCap
      const info = raw.split("|");
      cccd = info[0] || "";
      hoTen = info[2] || "";
      ngaySinh = info[3] || "";
      gioiTinh = info[4] || "";
      diaChi = info[5] || "";
    }

    return { cccd, hoTen, ngaySinh, gioiTinh, diaChi };
  };

  const handleBarCodeScanned = async (event: { data: string; type: string }) => {
    setScanned(true);
    setQrData(event.data);

    // Luôn lấy CCCD chuẩn từ QR
    const parsedData = parseQrData(event.data);
    const { cccd } = parsedData;

    // Gọi API để kiểm tra trong DB
    const result = await SearchScanQrCode(cccd);
    console.log("📡 Đang quét QR:", event.data);
    console.log("➡️ Kết quả DB:", result.data.length);

    if (result.data.length === 0) {
      console.log("❌ Chưa có thông tin bệnh nhân trong DB");

      try {
        await AsyncStorage.setItem(
          "PatientInformation",
          JSON.stringify(parsedData)
        );
        router.push("/createmanually");
      } catch (error) {
        console.error("❌ Lỗi khi lưu:", error);
      }
    } else if (result.data[0]._id) {
      console.log("✅ Có thông tin, chuyển sang PatientDetails");
      router.push({
        pathname: "/PatientDetails",
        params: { id: result.data[0]._id },
      });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {/* Vùng quét */}
      <View style={styles.scanBox}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        <Animated.View
          style={[styles.laser, { transform: [{ translateY: animatedValue }] }]}
        />
      </View>

      <View style={styles.bottomOverlay}>
        {scanned ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#007A86" }]}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Quét lại</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.text}>Đưa mã QR vào khung để quét</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  scanBox: {
    position: "absolute",
    top: "25%",
    alignSelf: "center",
    width: 250,
    height: 250,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#007A86",
  },
  topLeft: { top: 0, left: 0, borderLeftWidth: 4, borderTopWidth: 4 },
  topRight: { top: 0, right: 0, borderRightWidth: 4, borderTopWidth: 4 },
  bottomLeft: { bottom: 0, left: 0, borderLeftWidth: 4, borderBottomWidth: 4 },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  laser: { width: "100%", height: 2, backgroundColor: "red" },
  bottomOverlay: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
  },
  text: { color: "white", fontSize: 18, marginBottom: 10 },
  button: {
    backgroundColor: "#007A86",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
