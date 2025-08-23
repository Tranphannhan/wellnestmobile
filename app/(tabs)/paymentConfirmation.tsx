import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentConfirmation() {
  const router = useRouter()
  const patient = {
    name: "Nguyễn Thị Hồng Nhung",
    cccd: "038123456789",
    dob: "1992-03-10",
    phone: "0978123456",
    gender: "Nữ",
    height: "Không có",
    weight: "Không có",
    clinic: "108",
    department: "Chấn thương chỉnh hình",
    address: "Số 12, đường Lê Duẩn, TP. Vinh, Nghệ An",
    reason: "gbb",
  };

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
          <InputField label="Họ và tên" value={patient.name} />
          <InputField label="Số CCCD" value={patient.cccd} />
        </View>

        <View style={styles.grid}>
          <InputField label="Ngày sinh" value={patient.dob} />
          <InputField label="Số điện thoại" value={patient.phone} />
        </View>

        <View style={styles.grid}>
          <InputField label="Giới tính" value={patient.gender} />
          <InputField label="Chiều cao" value={patient.height + " cm"} />
        </View>

        <View style={styles.grid}>
          <InputField label="Cân nặng" value={patient.weight + " kg"} />
          <InputField label="Phòng khám" value={patient.clinic} />
        </View>

        <InputField label="Khoa" value={patient.department} />
        <InputField label="Địa chỉ" value={patient.address} />
        <View style={styles.field}>
          <Text style={styles.label}>Lí do đến khám</Text>
          <TextInput
            value={patient.reason}
            editable={false}
            multiline
            numberOfLines={3}
            style={[styles.input, styles.textarea]}
          />
        </View>
      </ScrollView>

      {/* Nút cố định dưới cùng */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={()=>{router.push('/home')}}  style={[styles.btn, styles.btnCancel]}>
          <Text style={styles.btnText}>Không thanh toán</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}} style={[styles.btn, styles.btnConfirm]}>
          <Text style={styles.btnText}>Xác nhận đã thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // chiếm toàn màn hình
    backgroundColor: "#fff",
  },

  textarea: {
    minHeight: 90,
    textAlignVertical: "top", // để text bắt đầu từ trên
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 100, // chừa chỗ cho button cố định
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  field: {
    flex: 1,
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },

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
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingBottom: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  btnCancel: {
    backgroundColor: "#e74c3c",
  },

  btnConfirm: {
    backgroundColor: "#3498db",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
