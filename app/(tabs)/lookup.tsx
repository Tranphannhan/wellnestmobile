import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const mockData = [
  {
    id: '1',
    hoTen: 'Phạm Minh Khoa',
    ngaySinh: '2005-10-22',
    gioiTinh: 'Nam',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // icon mặc định
  },
  {
    id: '2',
    hoTen: 'Nguyễn Thị Hồng Nhung',
    ngaySinh: '1992-03-10',
    gioiTinh: 'Nữ',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    id: '3',
    hoTen: 'Nike Air R2',
    ngaySinh: '1111-11-11',
    gioiTinh: 'Nam',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
];

export default function Lookup() {
  const [searchText, setSearchText] = useState('');

  const filteredData = mockData.filter((item) =>
    item.hoTen.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.hoTen}</Text>
        <Text style={styles.subInfo}>🎂 Ngày sinh: {item.ngaySinh}</Text>
        <Text style={styles.subInfo}>👤 Giới tính: {item.gioiTinh}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => alert(`Chi tiết ${item.hoTen}`)}>
        <Text style={styles.buttonText}>Xem</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔍 Tra cứu thông tin bệnh nhân</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên bệnh nhân..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Không tìm thấy kết quả.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8FAFF',
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#007AFF',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  subInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
  },
});
