import { useLocalSearchParams } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const mockData = [
  {
    id: '1',
    hoTen: 'Phạm Minh Khoa',
    ngaySinh: '2005-10-22',
    gioiTinh: 'Nam',
    soCCCD: '045123456789',
    soDienThoai: '0934567890',
    soBHYT: 'BHYT456888888',
    sdtNguoiThan: '0909876543',
    diaChi: '192 Trần Phú, TP. Nha Trang, Khánh Hòa',
    lichSuBenh: 'Đau thắt lưng, gan nhiễm mỡ độ 8',
  },
  {
    id: '2',
    hoTen: 'Nguyễn Thị Hồng Nhung',
    ngaySinh: '1992-03-10',
    gioiTinh: 'Nữ',
    soCCCD: '012345678901',
    soDienThoai: '0912345678',
    soBHYT: 'BHYT123456789',
    sdtNguoiThan: '0909123456',
    diaChi: '123 Lê Duẩn, Hà Nội',
    lichSuBenh: 'Cao huyết áp',
  },
];

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const user = mockData.find((item) => item.id === id);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>❌ Không tìm thấy bệnh nhân</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    

      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar + tên */}
        <View style={styles.profileBox}>
          <Image
            source={{ uri: 'https://anhnail.com/wp-content/uploads/2024/09/Hinh-gai-xinh-mac-vay-trang-ngan-che-mat.jpg' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.hoTen}</Text>
          <Text style={styles.role}>Bệnh nhân</Text>

         
        </View>

        {/* Thông tin chi tiết */}
        <View style={styles.infoCard}>
          <InfoRow label="Giới tính" value={user.gioiTinh} />
          <InfoRow label="Số điện thoại" value={user.soDienThoai} />
          <InfoRow label="Số BHYT" value={user.soBHYT} />
          <InfoRow label="Địa chỉ" value={user.diaChi} />
          <InfoRow label="Lịch sử bệnh" value={user.lichSuBenh} />
          <InfoRow label="Số CCCD" value={user.soCCCD} />
          <InfoRow label="Ngày sinh" value={user.ngaySinh} />
          <InfoRow label="SĐT người thân" value={user.sdtNguoiThan} />
        </View>
      </ScrollView>

      {/* Nút Tiếp nhận */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => alert('Đã tiếp nhận')}>
          <Text style={styles.acceptText}>Tiếp nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007A86',
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },

  
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#fff' },
  content: { padding: 20, paddingBottom: 100 },
  profileBox: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 50, backgroundColor: '#ddd' },
  name: { fontSize: 20, fontWeight: '700', color: '#222', marginTop: 10 },
  role: { color: '#888', fontSize: 14 },



  actionRow: { flexDirection: 'row', marginTop: 16, gap: 10 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f1f4f9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 6,
  },
  
  videoBtn: { backgroundColor: '#007AFF' },
  actionText: { fontSize: 14, fontWeight: '500', color: '#007AFF' },

  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  infoRow: { flexDirection: 'row', marginBottom: 12 },
  infoLabel: { fontWeight: '600', color: '#444', width: 140 },
  infoValue: { color: '#333', flex: 1, flexWrap: 'wrap' },

  bottomBar: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  acceptButton: {
    backgroundColor: '#007A86',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: screenWidth * 0.9,
    alignSelf: 'center',
  },

  acceptText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 18, color: 'red' },
});
