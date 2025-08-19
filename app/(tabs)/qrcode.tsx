import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function QrScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState("");

  if (!permission) {
    // Đang load quyền
    return <View />;
  }

  if (!permission.granted) {
    // Nếu chưa có quyền thì hiện nút xin quyền
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Ứng dụng cần quyền truy cập camera</Text>
        <Button onPress={requestPermission} title="Cấp quyền" />
      </View>
    );
  }

  const handleBarCodeScanned = (event: { data: string; type: string }) => {
    setScanned(true);
    setQrData(event.data);
    alert(`Đã quét thành công: ${event.data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // chỉ quét QR
        }}
      />

      <View style={styles.overlay}>
        {scanned ? (
          <Button title="Quét lại" onPress={() => setScanned(false)} />
        ) : (
          <Text style={styles.text}>Đưa mã QR vào khung</Text>
        )}
        {qrData ? <Text style={styles.result}>Kết quả: {qrData}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    bottom: 60,
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
});
