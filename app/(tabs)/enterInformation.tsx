import { Facultyselectionlist } from "@/services/Department";
import { FacultyselectionlistType } from "@/types/Department.type";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EnterInformation() {
  const router = useRouter();
  const [dataDepartment, setDataDepartment] = useState<
    FacultyselectionlistType[]
  >([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [department, setDepartment] = useState("");
  const [reason, setReason] = useState("");

  // Trạng thái lỗi
  const [errors, setErrors] = useState<{
    department?: string;
    reason?: string;
  }>({});

  useEffect(() => {
    const LoadingAPI = async () => {
      const GetAPI = await Facultyselectionlist();
      if (GetAPI.data.length === 0) return setDataDepartment([]);
      setDataDepartment(GetAPI.data);
    };

    LoadingAPI();
  }, []);

  const handleNext = () => {
    let newErrors: { department?: string; reason?: string } = {};

    if (!department) {
      newErrors.department = "Vui lòng chọn khoa";
    }
    if (!reason.trim()) {
      newErrors.reason = "Vui lòng nhập lý do đến khám";
    }

    setErrors(newErrors);

    // Nếu không có lỗi thì chuyển trang
    if (Object.keys(newErrors).length === 0) {
      router.push({
        pathname: "/confirmRoomSelection",
        params: {
          idKhoa: department,
          height,
          weight,
          reason,
        },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      {/* Nội dung cuộn */}
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 120 }]} // chừa chỗ cho nút
      >
        {/* Chiều cao */}
        <Text style={styles.label}>Chiều cao (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholder="Nhập chiều cao"
          placeholderTextColor="#8d8d8dff"
        />

        {/* Cân nặng */}
        <Text style={styles.label}>Cân nặng (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholder="Nhập cân nặng"
          placeholderTextColor="#8d8d8dff"
        />

        {/* Chọn khoa */}
        <Text style={styles.label}>Chọn khoa</Text>
        <View
          style={[
            styles.pickerWrapper,
            errors.department && { borderColor: "red" },
          ]}
        >
          <Picker
            selectedValue={department}
            onValueChange={(itemValue) => setDepartment(itemValue)}
          >
            <Picker.Item label="--- Chọn khoa ---" value="" />
            {dataDepartment.map((item) => (
              <Picker.Item
                key={item._id}
                label={item.TenKhoa}
                value={item._id}
              />
            ))}
          </Picker>
        </View>
        {errors.department && (
          <Text style={styles.errorText}>{errors.department}</Text>
        )}

        {/* Lý do đến khám */}
        <Text style={styles.label}>Lý do đến khám</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            errors.reason && { borderColor: "red" },
          ]}
          multiline
          numberOfLines={4}
          value={reason}
          onChangeText={setReason}
          placeholder="Nhập nội dung..."
          placeholderTextColor="#8d8d8dff"
        />
        {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
      </ScrollView>

      {/* Nút cố định dưới */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    color: "#646464ff",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  button: {
    backgroundColor: "#007A86",
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop:10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
});
