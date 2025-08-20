import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PaymentConfirmation() {
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Xác nhận thông tin thanh toán</Text> */}

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
      <InputField label="Lí do đến khám" value={patient.reason} />

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.btnCancel]}>
          <Text style={styles.btnText}>Không thanh toán</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnConfirm]}>
          <Text style={styles.btnText}>Xác nhận đã thanh toán</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
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
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom : 60,
    gap: 12,
  },


  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
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
