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
        console.log("📌 Dữ liệu mới load từ AsyncStorage:", parsed);

        setPatient({
          _id : parsed._id || "",
          hoTen: parsed.hoTen || "",
          ngaySinh: parsed.ngaySinh || "",
          gioiTinh: parsed.gioiTinh || "",
          soBHYT: parsed.soBHYT || "",
          soCCCD: parsed.soCCCD || "",
          soDienThoai: parsed.soDienThoai || "",
          sdtNguoiThan: parsed.sdtNguoiThan || "",
          diaChi: parsed.diaChi || "",
          lichSuBenh: parsed.lichSuBenh || "",
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



  // 🔹 Hàm cập nhật dữ liệu
const handleUpdate = useCallback(async () => {
  try {
    const result = await UpdatePatientInformation(patient);
    console.log("✅ API trả về:", result);
    alert("Cập nhật thành công!");
    
    // nếu cần thì lưu lại vào AsyncStorage
    await AsyncStorage.setItem("patientInfo", JSON.stringify(patient));

  } catch (error: any) {
    console.log("❌ Lỗi cập nhật:", error.message);
    alert("Cập nhật thất bại: " + error.message);
  }
}, [patient]);




  useEffect (() => {
    console.log('chay dữ liệu --- ');
    console.log(patient);
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
        <Text style={styles.value}>{patient.hoTen}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Ngày sinh</Text>
        <Text style={styles.value}>{patient.ngaySinh}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Giới tính</Text>
        <Text style={styles.value}>{patient.gioiTinh}</Text>
      </Card>

      {/* Các trường nhập */}
      <Card style={styles.card}>
        <Text style={styles.label}>Số BHYT</Text>
        <TextInput
          style={styles.input}
          value={patient?.soBHYT || ""}  
          placeholder="Nhập số BHYT"
          onChangeText={(text) => setPatient({ ...patient, soBHYT: text })}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Số CCCD</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số CCCD"
          value={patient?.soCCCD || ""}  
          onChangeText={(text) => setPatient({ ...patient, soCCCD: text })}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          value={patient?.soDienThoai || ""}  
          onChangeText={(text) => setPatient({ ...patient, soDienThoai: text })}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>SĐT người thân</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập SĐT người thân"
          value={patient?.sdtNguoiThan || ""}  
          onChangeText={(text) => setPatient({ ...patient, sdtNguoiThan: text })}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ"
          value={patient?.diaChi || ""}  
          onChangeText={(text) => setPatient({ ...patient, diaChi: text })}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Lịch sử bệnh</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập lịch sử bệnh"
          value={patient?.lichSuBenh || ""}  
          onChangeText={(text) => setPatient({ ...patient, lichSuBenh: text })}
        />
      </Card>

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
    marginBottom : 120
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
