import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [data, setData] = useState<string>('');
  const router = useRouter();

  function click() {
    router.push('/explore'); // <-- Đường dẫn đến file Explore.tsx hoặc Explore/index.tsx
  }

  return (
    <View style={{ backgroundColor: 'red', flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Hello cc</Text>
      <Button onPress={click} color="blue" title="Nhấn tôi" />
      <TextInput
        style={{ backgroundColor: 'white', marginTop: 10, padding: 5 }}
        onChange={(e) => {
          setData(e.nativeEvent.text);
          console.log(e.nativeEvent.text);
        }}
      />
    </View>
  );
}
