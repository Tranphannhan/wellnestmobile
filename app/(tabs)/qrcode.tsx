// import { BarCodeScanner } from 'expo-barcode-scanner';
import React from 'react';
import { Text, View } from 'react-native';






// export default function Qrcode() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <Text>Đang xin quyền truy cập camera...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>Không có quyền dùng camera</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={
//           scanned ? undefined : ({ type, data }) => {
//             setScanned(true);
//             alert(`Mã QR: ${data}`);
//           }
//         }
//         style={{ flex: 1 }}
//       />
//       {scanned && <Button title="Quét lại" onPress={() => setScanned(false)} />}
//     </View>
//   );
// }

export default function Qrcode () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style = {{
          color : 'red'
        }}

        
      >Quet mã qr hello </Text>
    </View>
  );

}