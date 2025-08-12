import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const mockData = [
  {
    id: '1',
    hoTen: 'Phạm Minh Khoa',
    ngaySinh: '2005-10-22',
    gioiTinh: 'Nam',
    avatar: 'https://anhnail.com/wp-content/uploads/2024/09/Hinh-gai-xinh-mac-vay-trang-ngan-che-mat.jpg',
  },
  {
    id: '2',
    hoTen: 'Nguyễn Thị Nhung',
    ngaySinh: '1992-03-10',
    gioiTinh: 'Nữ',
    avatar: 'https://wellavn.com/wp-content/uploads/2024/11/anh-gai-xinh-che-mat-bang-dien-thoai.jpeg',
  },
  {
    id: '3',
    hoTen: 'Nike Air R2',
    ngaySinh: '1111-11-11',
    gioiTinh: 'Nam',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGldpCglRLHDXxqnNZUcYHNm33aJ6J4KqGGgzwv1daoGQYdTsrxfZzA_iBHEm8KyHoKU&usqp=CAU',
  },
];

export default function Lookup() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const filteredData = mockData.filter((item) =>
    item.hoTen.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* Avatar */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      {/* Thông tin */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.hoTen}</Text>
        <Text style={styles.role}>Bệnh nhân</Text>
      </View>

      {/* Nút xem chi tiết */}
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() =>
          router.push({ pathname: '/Patient details', params: { id: item.id } })
        }
      >
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên bệnh nhân..."
        value={searchText}
        onChangeText={setSearchText}
      />
      {/* Danh sách */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Không tìm thấy kết quả.
          </Text>
        }
      />
    </View>
  );
}

const PRIMARY_COLOR = '#007A86';

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
    color: PRIMARY_COLOR,
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
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
    color: '#000',
  },
  role: {
    fontSize: 13,
    color: '#777',
  },
  detailButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  detailButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
});
