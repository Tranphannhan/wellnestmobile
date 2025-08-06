import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function QrcodeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  // Xin quyền camera
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Hàm xử lý khi quét
  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    setQrData(data);
    Alert.alert("✅ Mã QR đã quét", `Dữ liệu: ${data}`);
  };

  // Đang xin quyền
  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>📸 Đang xin quyền truy cập camera...</Text>
      </View>
    );
  }

  // Không có quyền
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>❌ Không có quyền truy cập camera</Text>
      </View>
    );
  }

  // Giao diện chính
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} // chỉ quét QR
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="🔄 Quét lại" onPress={() => {
            setScanned(false);
            setQrData(null);
          }} color="#1E90FF" />
        </View>
      )}

      {qrData && (
        <View style={styles.qrResult}>
          <Text style={styles.resultText}>📦 Dữ liệu: {qrData}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  qrResult: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
