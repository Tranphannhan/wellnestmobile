import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
  const [secure, setSecure] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

    // const HandleLogin = useCallback (() => {
    //     console.log('nhấn --');
        
    // }, []);


  return (
    <View style={styles.container}>
      {/* Nền xanh phía trên */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/avt.jpg')} // thay bằng logo của bạn
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Form đăng nhập */}
      <View style={styles.form}>
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
              name={secure ? 'eye-off' : 'eye'}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text  style={styles.loginText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        <Text style={styles.registerQuestion}>
          Bạn quên tài khoản?
        </Text>

   
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#007A86',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 70,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },


  logo: { width: 150, height: 150, marginTop: 150 ,  borderRadius: 75},
  appName: { color: '#fff', fontSize: 22,  },
  form: { padding: 20 },
  input: {
    height: 50,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20
  },
  passwordInput: { flex: 1 },
  loginButton: {
    backgroundColor: '#007A86',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    gap: 10,
    marginBottom: 15
  },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  registerQuestion: { textAlign: 'center', marginBottom: 10, color: '#333' },
  registerButton: {
    backgroundColor: '#EDEDED',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15
  },
  registerText: { fontWeight: 'bold', color: '#333' },
  forgotPassword: {
    textAlign: 'center',
    color: '#007A86',
    fontWeight: '500'
  }
});
