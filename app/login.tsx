import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (username === 'admin' && password === '123') {
      await AsyncStorage.setItem('token', 'your_token_here');
      router.replace('/home'); // Chuyển sang trang chủ
    } else {
      alert('Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Tên đăng nhập</Text>
      <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Mật khẩu</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
}
