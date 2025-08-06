// app/(tabs)/acount.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Acount() {
  const user = {
    hoTen: 'Trần Tiếp Nhận',
    vaiTro: 'Tiếp Nhận',
    soDienThoai: '0908609105',
    soCCCD: '092018304122',
    gioiTinh: 'Nam',
    avatar:
      'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // ảnh đại diện mẫu
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.hoTen}</Text>
        <Text style={styles.role}>{user.vaiTro}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Sửa thông tin</Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.infoBox}>
        <InfoRow label="Số điện thoại" value={user.soDienThoai} />
        <InfoRow label="CCCD" value={user.soCCCD} />
        <InfoRow label="Giới tính" value={user.gioiTinh} />
      </View>
    </ScrollView>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  role: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    flex: 1,
    fontWeight: '600',
    color: '#444',
  },
  value: {
    flex: 2,
    color: '#333',
  },
});
