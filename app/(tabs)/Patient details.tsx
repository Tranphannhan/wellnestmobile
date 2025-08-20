import { patientInformationDetails } from '@/services/lookup';
import { medicalExaminationBook } from '@/types/lookup.type';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DetailScreen({ navigation }: any) {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [dataDetail, setDataDetail] = useState<medicalExaminationBook | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAPI = async () => {
      try {
        setLoading(true);
        const res = await patientInformationDetails(id as string);
        setDataDetail(res[0]); // API trả về object chi tiết bệnh nhân
      } catch (error) {
        console.error('Lỗi load chi tiết:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAPI();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007A86" />
      </View>
    );
  }

  if (!dataDetail) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>❌ Không tìm thấy bệnh nhân</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Họ tên */}
        <Text style={styles.name}>{dataDetail.HoVaTen}</Text>
        <Text style={styles.role}>Bệnh nhân</Text>

        {/* Thông tin chi tiết */}
        <View style={styles.infoCard}>
          <InfoRow label="Giới tính" value={dataDetail.GioiTinh} />
          <InfoRow label="Ngày sinh" value={dataDetail.NgaySinh} />
          <InfoRow label="Số điện thoại" value={dataDetail.SoDienThoai} />
          <InfoRow label="Số BHYT" value={dataDetail.SoBaoHiemYTe} />
          <InfoRow label="Địa chỉ" value={dataDetail.DiaChi} />
          <InfoRow label="Số CCCD" value={dataDetail.SoCCCD} />
          <InfoRow label="SĐT người thân" value={dataDetail.SDT_NguoiThan} />
          <InfoRow label="Lịch sử bệnh" value={dataDetail.LichSuBenh} />
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => alert('ok')}
        >
          <Text style={styles.actionText}>Sửa thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => router.push('/enterInformation')}
        >
          <Text style={styles.actionText}>Tiếp nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value || '---'}</Text>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  content: { padding: 20, paddingBottom: 100 },

  name: { fontSize: 18, fontWeight: '700', color: '#222', marginBottom: 4 },
  role: { color: '#888', fontSize: 16, marginBottom: 20 },

  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  infoRow: { flexDirection: 'row', marginBottom: 15 },
  infoLabel: { fontWeight: '600', color: '#444', width: 140, fontSize: 16 },
  infoValue: { color: '#333', flex: 1, flexWrap: 'wrap', fontSize: 16 },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: 'white',

    // 👇 Thêm shadow nhẹ
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1, 
    shadowRadius: 3,
    elevation: 6,
  },


  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  editButton: {
    backgroundColor: '#d5ae00ff',
  },

  acceptButton: {
    backgroundColor: '#007A86',
  },

  actionText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 16, color: 'red' },
});
