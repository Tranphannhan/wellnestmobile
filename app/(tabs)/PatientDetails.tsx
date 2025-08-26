import { patientInformationDetails } from "@/services/lookup";
import { medicalExaminationBook } from "@/types/lookup.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [dataDetail, setDataDetail] = useState<medicalExaminationBook | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 🔹 Load nhanh từ AsyncStorage (nếu có)
  const loadFromCache = async () => {
    try {
      const cached = await AsyncStorage.getItem("patientInfo");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed._id === id) {
          setDataDetail({
            _id: parsed._id,
            HoVaTen: parsed.hoTen,
            GioiTinh: parsed.gioiTinh,
            NgaySinh: parsed.ngaySinh,
            SoBaoHiemYTe: parsed.soBHYT,
            SoCCCD: parsed.soCCCD,
            SoDienThoai: parsed.soDienThoai,
            SDT_NguoiThan: parsed.sdtNguoiThan,
            DiaChi: parsed.diaChi,
            LichSuBenh: parsed.lichSuBenh,
          });
        }
      }
    } catch (e) {
      console.error("❌ Lỗi đọc cache:", e);
    }
  };

  // 🔹 Luôn refresh dữ liệu khi trang focus
  useFocusEffect(
    useCallback(() => {
      const loadAPI = async () => {
        try {
          setLoading(true);
          const res = await patientInformationDetails(id as string);
          if (res && res[0]) {
            setDataDetail(res[0]);
          }
        } catch (error) {
          console.error("❌ Lỗi load chi tiết:", error);
        } finally {
          setLoading(false);
        }
      };

      // Load cache trước cho nhanh
      loadFromCache();
      // Rồi fetch API để chắc chắn dữ liệu mới nhất
      loadAPI();
    }, [id])
  );

  const Edit = async () => {
    try {
      if (!dataDetail) return;

      // Chuẩn hóa dữ liệu để lưu lại
      const fullInfo = {
        _id: dataDetail._id || null,
        hoTen: dataDetail.HoVaTen || "",
        gioiTinh: dataDetail.GioiTinh || "Nam",
        ngaySinh: dataDetail.NgaySinh || "",
        soBHYT: dataDetail.SoBaoHiemYTe || "",
        soCCCD: dataDetail.SoCCCD || "",
        soDienThoai: dataDetail.SoDienThoai || "",
        sdtNguoiThan: dataDetail.SDT_NguoiThan || "",
        diaChi: dataDetail.DiaChi || "",
        lichSuBenh: dataDetail.LichSuBenh || "",
      };

      await AsyncStorage.setItem("patientInfo", JSON.stringify(fullInfo));

      router.push("/(tabs)/editPatientInformation");
    } catch (e) {
      console.error("❌ Lỗi lưu AsyncStorage:", e);
    }
  };

  if (loading && !dataDetail) {
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
          onPress={Edit}
        >
          <Text style={styles.actionText}>Sửa thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity  
          style={[styles.actionButton, styles.acceptButton]}
          onPress={async () => {
            try {
              if (dataDetail) {
                await AsyncStorage.setItem(
                  "patientDetail",
                  JSON.stringify(dataDetail)
                );
                router.push("/enterInformation");
              }
            } catch (e) {
              console.error("❌ Lỗi lưu thông tin bệnh nhân:", e);
            }
          }}
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
      <Text style={styles.infoValue}>{value || "---"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF" },
  content: { padding: 20, paddingBottom: 100 },

  name: { fontSize: 18, fontWeight: "700", color: "#222", marginBottom: 4 },
  role: { color: "#888", fontSize: 16, marginBottom: 20 },

  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  infoRow: { flexDirection: "row", marginBottom: 15 },
  infoLabel: { fontWeight: "600", color: "#444", width: 140, fontSize: 16 },
  infoValue: { color: "#333", flex: 1, flexWrap: "wrap", fontSize: 16 },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  editButton: { backgroundColor: "#d5ae00ff" },
  acceptButton: { backgroundColor: "#007A86" },

  actionText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { fontSize: 16, color: "red" },
});
