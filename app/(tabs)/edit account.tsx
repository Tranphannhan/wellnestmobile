import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EditAccount() {
  const navigation = useNavigation();

  const user = {
    hoTen: 'Trần Tiếp Nhận',
    vaiTro: 'TiepNhan',
    avatar: 'https://anhnail.com/wp-content/uploads/2024/09/Hinh-gai-xinh-mac-vay-trang-ngan-che-mat.jpg',
  };

  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [xacNhanMK, setXacNhanMK] = useState('');
  const [showMK, setShowMK] = useState(false);
  const [showXNMK, setShowXNMK] = useState(false);

  const handleSave = () => {
    if (matKhauMoi !== xacNhanMK) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp!');
      return;
    }
    Alert.alert('Thành công', 'Mật khẩu đã được cập nhật.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.hoTen}</Text>
        <Text style={styles.role}>{user.vaiTro}</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Mật khẩu mới</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry={!showMK}
            value={matKhauMoi}
            onChangeText={setMatKhauMoi}
          />
          <TouchableOpacity onPress={() => setShowMK(!showMK)}>
            <Ionicons name={showMK ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={!showXNMK}
            value={xacNhanMK}
            onChangeText={setXacNhanMK}
          />
          <TouchableOpacity onPress={() => setShowXNMK(!showXNMK)}>
            <Ionicons name={showXNMK ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>


      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FA' },
  header: {
    alignItems: 'center', paddingVertical: 30,
    backgroundColor: '#007A86',
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
  },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#fff', marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  role: { color: '#e0e0e0' },
  form: {
    backgroundColor: '#fff', margin: 16, borderRadius: 12,
    padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 3,
  },
  label: { fontWeight: '600', color: '#333', marginTop: 10, marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 10, backgroundColor: '#fafafa',
  },

  
  input: { flex: 1, paddingVertical: 10, color: '#333' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', margin: 16, gap: 10 },
  cancelButton: { flex: 1, backgroundColor: '#ddd', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  cancelText: { color: '#333', fontWeight: '600' },
  saveButton: { flex: 1, backgroundColor: '#007A86', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '600' },
});
