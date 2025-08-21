import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";

export default function EditPatientInformation() {
  const router = useRouter();
  const [form, setForm] = useState({
    hoTen: "",
    gioiTinh: "Nam",
    soBHYT: "",
    soDienThoai: "",
    soCCCD: "",
    ngaySinh: "",
    sdtNguoiThan: "",
    diaChi: "",
    lichSuBenh: "",
  });
  

  // 🔹 Load dữ liệu đã lưu trước đó (nếu có)
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("patientInfo");
        if (saved) {
          setForm(JSON.parse(saved));
        }
      } catch (error) {
        console.log("Lỗi load dữ liệu:", error);
      }
    })();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("patientInfo", JSON.stringify(form));
      Alert.alert("✅ Thành công", "Đã lưu thông tin");
    //   router.push("/PatientInfoScreen"); // chuyển sang trang hiển thị
    
    } catch (error) {
        console.log(error);
      Alert.alert("❌ Lỗi", "Không thể lưu dữ liệu");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Họ tên */}
      <Card style={styles.card}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ và tên"
          value={form.hoTen}
          onChangeText={(val) => handleChange("hoTen", val)}
        />
      </Card>

      {/* Ngày sinh & Giới tính */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.flexItem, { marginRight: 8 }]}>
            <Text style={styles.label}>Ngày sinh</Text>
            <TextInput
              style={styles.input}
              placeholder="dd/mm/yyyy"
              value={form.ngaySinh}
              onChangeText={(val) => handleChange("ngaySinh", val)}
            />
          </View>

          <View style={styles.flexItem}>
            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.gioiTinh}
                onValueChange={(val) => handleChange("gioiTinh", val)}
                style={{ flex: 1 }}
              >
                <Picker.Item label="Nam" value="Nam" />
                <Picker.Item label="Nữ" value="Nữ" />
                <Picker.Item label="Khác" value="Khác" />
              </Picker>
            </View>
          </View>
        </View>
      </Card>

      {/* Số BHYT & CCCD */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.flexItem, { marginRight: 8 }]}>
            <Text style={styles.label}>Số BHYT</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số BHYT"
              keyboardType="numeric"
              value={form.soBHYT}
              onChangeText={(val) => handleChange("soBHYT", val)}
            />
          </View>

          <View style={styles.flexItem}>
            <Text style={styles.label}>Số CCCD</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số CCCD"
              keyboardType="numeric"
              value={form.soCCCD}
              onChangeText={(val) => handleChange("soCCCD", val)}
            />
          </View>
        </View>
      </Card>

      {/* SĐT & SĐT người thân */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.flexItem, { marginRight: 8 }]}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              value={form.soDienThoai}
              onChangeText={(val) => handleChange("soDienThoai", val)}
            />
          </View>

          <View style={styles.flexItem}>
            <Text style={styles.label}>SĐT người thân</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập SĐT người thân"
              keyboardType="phone-pad"
              value={form.sdtNguoiThan}
              onChangeText={(val) => handleChange("sdtNguoiThan", val)}
            />
          </View>
        </View>
      </Card>

      {/* Địa chỉ */}
      <Card style={styles.card}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ"
          value={form.diaChi}
          onChangeText={(val) => handleChange("diaChi", val)}
        />
      </Card>

      {/* Lịch sử bệnh */}
      <Card style={styles.card}>
        <Text style={styles.label}>Lịch sử bệnh</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Nhập lịch sử bệnh"
          multiline
          value={form.lichSuBenh}
          onChangeText={(val) => handleChange("lichSuBenh", val)}
        />
      </Card>

      {/* Nút Lưu */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <MaterialCommunityIcons name="content-save" size={20} color="white" />
        <Text style={styles.buttonText}>Lưu thông tin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 16, marginBottom: 70 },
  card: { padding: 12, marginBottom: 12, borderRadius: 12, backgroundColor: "#fff", elevation: 2 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6, color: "#333" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, fontSize: 14, backgroundColor: "#fafafa" },
  pickerWrapper: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, overflow: "hidden" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  flexItem: { flex: 1 },
  button: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#007A86", padding: 14, borderRadius: 12, marginTop: 20 },
  buttonText: { color: "white", fontWeight: "600", marginLeft: 8 },
});
