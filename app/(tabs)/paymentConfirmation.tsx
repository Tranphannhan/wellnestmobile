import { medicalExaminationBook } from "@/types/lookup.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function PaymentConfirmation() {
  const [data, setData] = useState<medicalExaminationBook | null>(null);
  const { reason, height, weight, departmentName, roomNumber, idPhieuKham } =
    useLocalSearchParams();
  const router = useRouter();

  // load lại dữ liệu mỗi khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const dataLocal = await AsyncStorage.getItem("patientDetail");
          if (dataLocal) {
            const parsed: medicalExaminationBook = JSON.parse(dataLocal);
            console.log("📌 Patient detail local:", parsed);
            setData(parsed);
          } else {
            setData(null);
          }
        } catch (error) {
          console.error("❌ Lỗi đọc AsyncStorage:", error);
        }
      };

      loadData();

      // cleanup nếu cần reset khi rời trang
      return () => {
        setData(null);
      };
    }, [])
  );

  const InputField = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} editable={false} style={styles.input} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Nội dung scroll */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          <InputField label="Họ và tên" value={data?.HoVaTen || "Chưa rõ"} />
          <InputField label="Số CCCD" value={data?.SoCCCD || "Chưa rõ"} />
        </View>

        <View style={styles.grid}>
          <InputField label="Ngày sinh" value={data?.NgaySinh || "Chưa rõ"} />
          <InputField
            label="Số điện thoại"
            value={data?.SoDienThoai || "Chưa rõ"}
          />
        </View>

        <View style={styles.grid}>
          <InputField label="Giới tính" value={data?.GioiTinh || "Chưa rõ"} />
          <InputField label="Chiều cao" value={`${height || "?"} cm`} />
        </View>

        <View style={styles.grid}>
          <InputField label="Cân nặng" value={`${weight || "?"} kg`} />
          <InputField label="Phòng khám" value={(roomNumber as string) || ""} />
        </View>

        <InputField label="Khoa" value={(departmentName as string) || ""} />
        <InputField label="Địa chỉ" value={data?.DiaChi || "Chưa rõ"} />

        <View style={styles.field}>
          <Text style={styles.label}>Lí do đến khám</Text>
          <TextInput
            value={(reason as string) || ""}
            editable={false}
            multiline
            numberOfLines={3}
            style={[styles.input, styles.textarea]}
          />
        </View>
      </ScrollView>

      {/* Nút cố định dưới cùng */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            router.push("/home");
          }}
          style={[styles.btn, styles.btnCancel]}
        >
          <Text style={styles.btnText}>Không thanh toán</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/pay",
              params: { name: data?.HoVaTen || "", idPhieuKham },
            });
          }}
          style={[styles.btn, styles.btnConfirm]}
        >
          <Text style={styles.btnText}>Xác nhận đã thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  textarea: { minHeight: 90, textAlignVertical: "top" },
  scrollContent: { padding: 20, paddingBottom: 100 },
  grid: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  field: { flex: 1, marginBottom: 15 },
  label: { fontSize: 14, color: "#555", marginBottom: 5 },
  input: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#444",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    paddingHorizontal: 12,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingBottom: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, marginHorizontal: 5 },
  btnCancel: { backgroundColor: "#e74c3c" },
  btnConfirm: { backgroundColor: "#3498db" },
  btnText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
