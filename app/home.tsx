import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chào mừng đến với trang chủ</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>

    
  );
}
