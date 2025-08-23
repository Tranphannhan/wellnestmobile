import { SearchScanQrCode } from "@/services/lookup";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

  const handleBarCodeScanned = async (event: { data: string; type: string }) => {
    setScanned(true);
    setQrData(event.data);
    const cccd = event.data.split("||")[0];
    const result = await SearchScanQrCode(cccd);

    if (result.data[0]._id) {
      router.push({
        pathname: "/PatientDetails",
        params: { id: result.data[0]._id },
      });
    } else {

      alert ("Trường hơp chưa có thông tin");
      // ---- 


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
        {/* Góc khung */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        {/* Tia laser */}
        <Animated.View
          style={[
            styles.laser,
            { transform: [{ translateY: animatedValue }] },
          ]}
        />
      </View>

      {/* Text & nút */}
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

        {/* hiện thông tin */}
        {/* {qrData ? <Text style={styles.result}>Kết quả: {qrData}</Text> : null} */}


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
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
    borderColor: "#007A86", // màu viền xanh đậm
  },
  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 4,
    borderTopWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 4,
    borderTopWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  laser: {
    width: "100%",
    height: 2,
    backgroundColor: "red",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  result: {
    color: "yellow",
    fontSize: 16,
    marginTop: 10,
  },
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
