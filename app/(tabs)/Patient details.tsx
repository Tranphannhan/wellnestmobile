import { patientInformationDetails } from '@/services/lookup';
import { medicalExaminationBook } from '@/types/lookup.type';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function DetailScreen( { navigation }: any) {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // lấy id truyền sang
  const [dataDetail, setDataDetail] = useState<medicalExaminationBook | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAPI = async () => {
      try {
        setLoading(true);
        const res = await patientInformationDetails(id as string);
        setDataDetail(res [0]); // API trả về object chi tiết bệnh nhân
      } catch (error) {
        console.error("Lỗi load chi tiết:", error);
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

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.acceptButton}
          onPress={() => router.push("/enterInformation")}
        >
          <Text style={styles.acceptText}>Tiếp nhận</Text>
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
  name: { fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 4 },
  role: { color: '#888', fontSize: 14, marginBottom: 20 },

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
