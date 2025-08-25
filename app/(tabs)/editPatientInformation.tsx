import { UpdatePatientInformation } from "@/services/lookup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Card } from "react-native-paper";

export default function PatientInformationDetails() {
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadPatientInfo = async () => {
    try {
      const saved = await AsyncStorage.getItem("patientInfo");
      if (saved) {
        const parsed = JSON.parse(saved);
        setPatient({
          ID: parsed._id || "",
          HoVaTen: parsed.hoTen || "",
          NgaySinh: parsed.ngaySinh || "",
          GioiTinh: parsed.gioiTinh || "",
          SoBaoHiemYTe: parsed.soBHYT || "",
          SoCCCD: parsed.soCCCD || "",
          SoDienThoai: parsed.soDienThoai || "",
          SDT_NguoiThan: parsed.sdtNguoiThan || "",
          DiaChi: parsed.diaChi || "",
          LichSuBenh: parsed.lichSuBenh || "",
        });
      } else {
        setPatient(null);
      }
    } catch (error) {
      console.log("❌ Lỗi load dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPatientInfo();
    }, [])
  );

  // 🔹 Hàm cập nhật dữ liệu hoàn thiện
  const handleUpdate = useCallback(async () => {
    try {
      if (!patient) return;

      // Chuẩn hóa tất cả giá trị thành string
      const payload: any = {};
      Object.keys(patient).forEach(key => {
        const value = patient[key];
        payload[key] = value !== undefined && value !== null ? value.toString() : "";
      });

      console.log("📤 Payload gửi lên API:", payload);

      const result = await UpdatePatientInformation(payload);
      console.log("✅ API trả về:", result);
      alert("Cập nhật thành công!");

      // Lưu payload đã chuẩn hóa vào AsyncStorage
      await AsyncStorage.setItem("patientInfo", JSON.stringify(payload));
      setPatient(payload); // cập nhật lại state với dữ liệu chuẩn hóa
    } catch (error: any) {
      console.log("❌ Lỗi cập nhật:", error.message);
      alert("Cập nhật thất bại: " + error.message);
    }
  }, [patient]);

  useEffect(() => {
    console.log("🔹 Dữ liệu hiện tại của patient:", patient);
  }, [patient]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007A86" />
      </View>
    );
  }

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text>Chưa có thông tin bệnh nhân</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 3 thông tin hiển thị */}
      <Card style={styles.card}>
        <Text style={styles.label}>Họ và tên</Text>
        <Text style={styles.value}>{patient.HoVaTen}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Ngày sinh</Text>
        <Text style={styles.value}>{patient.NgaySinh}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Giới tính</Text>
        <Text style={styles.value}>{patient.GioiTinh}</Text>
      </Card>

      {/* Các trường nhập */}
      {[
        { label: "Số BHYT", key: "SoBaoHiemYTe", placeholder: "Nhập số BHYT" },
        { label: "Số CCCD", key: "SoCCCD", placeholder: "Nhập số CCCD" },
        { label: "Số điện thoại", key: "SoDienThoai", placeholder: "Nhập số điện thoại" },
        { label: "SĐT người thân", key: "SDT_NguoiThan", placeholder: "Nhập SĐT người thân" },
        { label: "Địa chỉ", key: "DiaChi", placeholder: "Nhập địa chỉ" },
        { label: "Lịch sử bệnh", key: "LichSuBenh", placeholder: "Nhập lịch sử bệnh" },
      ].map(field => (
        <Card style={styles.card} key={field.key}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={patient[field.key] || ""}
            placeholder={field.placeholder}
            onChangeText={text => setPatient({ ...patient, [field.key]: text })}
          />
        </Card>
      ))}

      {/* 🔹 Nút cập nhật */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật thông tin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f6fa" },
  card: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#007A86" },
  value: { fontSize: 15, color: "#333", marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginTop: 6,
    backgroundColor: "#fafafa",
  },
  button: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#007A86",
    alignItems: "center",
    marginBottom: 120,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
