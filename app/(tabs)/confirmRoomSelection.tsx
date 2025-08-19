import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const rooms = [
  {
    doctor: "Nguyễn Đình Huân",
    roomNumber: 108,
    patients: "0/14 bệnh nhân",
    estimate: "0 phút",
    status: "Ít bệnh nhân",
  },
  {
    doctor: "Trần Văn B",
    roomNumber: 201,
    patients: "5/10 bệnh nhân",
    estimate: "15 phút",
    status: "Đang khám",
  },
];

export default function ConfirmRoomSelection() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  // form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");

  const handleConfirm = () => {
    console.log({
      selectedRoom,
      name,
      phone,
      gender,
      department,
    });
    alert("Đã xác nhận thông tin!");
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.doctor}</Text>
      <Text style={styles.cell}>{item.roomNumber}</Text>
      <Text style={styles.cell}>{item.patients}</Text>
      <Text style={styles.cell}>{item.estimate}</Text>
      <Text
        style={[
          styles.cell,
          styles.status,
          item.status === "Ít bệnh nhân" ? styles.statusGreen : styles.statusOrange,
        ]}
      >
        {item.status}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedRoom(item.roomNumber)}
      >
        <Text style={styles.buttonText}>Ưu tiên</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.headerText}>Tên bác sĩ</Text>
        <Text style={styles.headerText}>Số phòng</Text>
        <Text style={styles.headerText}>Số lượng</Text>
        <Text style={styles.headerText}>Thời gian</Text>
        <Text style={styles.headerText}>Trạng thái</Text>
        <Text style={styles.headerText}>Hành động</Text>
      </View>

      {/* Danh sách */}
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />

      {/* Form chọn */}
      {selectedRoom && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Nhập thông tin bệnh nhân</Text>
          <Text>Phòng đã chọn: {selectedRoom}</Text>

          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />


          {/* Picker giới tính */}
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={gender} onValueChange={setGender}>
              <Picker.Item label="--- Giới tính ---" value="" />
              <Picker.Item label="Nam" value="male" />
              <Picker.Item label="Nữ" value="female" />
              <Picker.Item label="Khác" value="other" />
            </Picker>
          </View>

          {/* Picker khoa */}
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={department} onValueChange={setDepartment}>
              <Picker.Item label="--- Chọn khoa ---" value="" />
              <Picker.Item label="Nội tổng quát" value="general" />
              <Picker.Item label="Nhi" value="pediatrics" />
              <Picker.Item label="Tim mạch" value="cardiology" />
              <Picker.Item label="Ngoại khoa" value="surgery" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#fff" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  header: { backgroundColor: "#f2f2f2" },
  headerText: { flex: 1, fontWeight: "bold", textAlign: "center" },
  cell: { flex: 1, textAlign: "center" },
  status: { padding: 4, borderRadius: 4 },
  statusGreen: { backgroundColor: "#DFFFE0", color: "#007A86" },
  statusOrange: { backgroundColor: "#FFF0D0", color: "#D2691E" },
  button: {
    backgroundColor: "#007A86",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  form: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#F9F9F9",
  },
  formTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  confirmButton: {
    marginTop: 15,
    backgroundColor: "#007A86",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
