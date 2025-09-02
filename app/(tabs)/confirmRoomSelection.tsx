import { getAllChooseRooms } from "@/services/confirmRoomSelection";
import { receptionTemporaryDoctorTypes } from "@/types/confirmRoomSelection";
import { medicalExaminationBook } from "@/types/lookup.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

interface createExaminationCardInformationType {
  Id_TheKhamBenh?: string;
  Id_Bacsi?: string;
  Id_NguoiTiepNhan?: string;
  Id_GiaDichVu?: string;
  LyDoDenKham?: string;
}

interface VitalSignsType {
  Id_PhieuKhamBenh: string;
  ChieuCao: string;
  CanNang: string;
}

export default function ChooseRoomMobile() {
  const [rooms, setRooms] = useState<receptionTemporaryDoctorTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { idKhoa, reason, height, weight, departmentName } =
    useLocalSearchParams();
  const router = useRouter();

  const MAX_PATIENTS = 10;
  const MINUTES_PER_PATIENT = 15;

  async function handleNext(Doctor: string, roomNumber: string) {
    try {
      // Lấy dữ liệu từ AsyncStorage
      const dataLocal = await AsyncStorage.getItem("patientDetail");
      const jsonDataLocal: medicalExaminationBook = dataLocal
        ? JSON.parse(dataLocal)
        : null;

      if (!jsonDataLocal?._id) {
        throw new Error("Không tìm thấy thông tin bệnh nhân!");
      }

      // Kiểm tra dữ liệu đầu vào
      if (!height || !weight) {
        throw new Error("Chiều cao hoặc cân nặng không hợp lệ!");
      }

      // Tạo phiếu khám bệnh
      const examinationCardInformation: createExaminationCardInformationType = {
        Id_Bacsi: Doctor,
        LyDoDenKham: reason as string,
        Id_TheKhamBenh: jsonDataLocal._id,
        Id_GiaDichVu: "683420eb8b7660453369dce1",
        Id_NguoiTiepNhan: "68272e93b4cfad70da810029",
      };

      const response = await fetch(
        `https://bewellnest.onrender.com/Phieu_Kham_Benh/Add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(examinationCardInformation),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Tạo phiếu khám bệnh thất bại!");
      }

      const data = await response.json();
      const idPhieuKham = data.data?._id;

      if (!idPhieuKham) {
        throw new Error("Không nhận được Id_PhieuKhamBenh từ server!");
      }

      // Lưu chỉ số sinh tồn
      const vitalSignsData: VitalSignsType = {
        Id_PhieuKhamBenh: idPhieuKham,
        ChieuCao: height as string,
        CanNang: weight as string,
      };

      const vitalSignsResponse = await fetch(
        "https://bewellnest.onrender.com/Chi_So_Sinh_Ton/Add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vitalSignsData),
        }
      );

      if (!vitalSignsResponse.ok) {
        const errorData = await vitalSignsResponse.json();
        throw new Error(errorData.message || "Lưu chỉ số sinh tồn thất bại!");
      }

      // Hiển thị thông báo thành công
      Toast.show({
        type: "success",
        text1: "Thành công 🎉",
        text2: "Tạo phiếu khám bệnh và lưu chỉ số sinh tồn thành công!",
      });

      // Điều hướng đến màn hình xác nhận thanh toán
      router.push({
        pathname: "/paymentConfirmation",
        params: {
          reason,
          height,
          weight,
          roomNumber,
          departmentName,
          idPhieuKham,
        },
      });
    } catch (error) {
      // Xử lý lỗi tổng quát
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: error.message || "Đã xảy ra lỗi, vui lòng thử lại!",
      });
    }
  }

  const fetchRooms = async () => {
    if (!idKhoa) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không tìm thấy idKhoa!",
      });
      return;
    }
    try {
      setLoading(true);
      const data = await getAllChooseRooms(idKhoa as string, 1);
      if (data && data.data) {
        const sortedRooms = [...data.data].sort(
          (a, b) => a.SoNguoiDangKham - b.SoNguoiDangKham
        );
        setRooms(sortedRooms);
      } else {
        throw new Error("Không tìm thấy dữ liệu phòng khám!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy phòng:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể lấy danh sách phòng khám!",
      });
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRooms();
    }, [idKhoa])
  );

  const getBadgeStyle = (patients: number, max: number) => {
    const ratio = patients / max;
    if (ratio < 0.3) return styles.statusGreen;
    if (ratio < 0.7) return styles.statusOrange;
    return styles.statusRed;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours} tiếng` : `${hours} tiếng ${mins} phút`;
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: receptionTemporaryDoctorTypes;
    index: number;
  }) => {
    const isFull = item.SoNguoiDangKham >= MAX_PATIENTS;
    const estimateMinutes = item.SoNguoiDangKham * MINUTES_PER_PATIENT;

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.doctor}>BS. {item.TenBacSi}</Text>
          <Text style={styles.roomNumber}>
            Phòng {item.Id_PhongKham.SoPhongKham}
          </Text>
        </View>

        <Text style={styles.font}>
          Đang khám:{" "}
          <Text style={styles.bold}>
            {item.SoNguoiDangKham}/{MAX_PATIENTS}
          </Text>{" "}
          bệnh nhân
        </Text>

        <Text style={styles.font}>
          Thời gian dự tính:{" "}
          <Text style={styles.bold}>{formatTime(estimateMinutes)}</Text>
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            justifyContent: "space-between",
          }}
        >
          <View
            style={[
              styles.status,
              getBadgeStyle(item.SoNguoiDangKham, MAX_PATIENTS),
            ]}
          >
            <View
              style={[
                styles.statusDot,
                item.SoNguoiDangKham / MAX_PATIENTS < 0.3
                  ? { backgroundColor: "#00ce00" }
                  : item.SoNguoiDangKham / MAX_PATIENTS < 0.7
                  ? { backgroundColor: "#ff9900" }
                  : { backgroundColor: "#ff3333" },
              ]}
            />
            <Text style={styles.statusText}>
              {item.SoNguoiDangKham / MAX_PATIENTS < 0.3
                ? "Ít bệnh nhân"
                : item.SoNguoiDangKham / MAX_PATIENTS < 0.7
                ? "Trung bình"
                : "Quá tải"}
            </Text>
          </View>

          <View
            style={[
              styles.button,
              isFull && styles.buttonDisabled,
              index === 0 && !isFull && styles.buttonSelected,
            ]}
          >
            <Text
              style={styles.buttonText}
              onPress={() => {
                if (!isFull) {
                  handleNext(item._id, item.Id_PhongKham.SoPhongKham);
                }
              }}
            >
              {isFull ? "Đã đầy" : index === 0 ? "Ưu tiên" : "Chọn phòng"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", flex: 1 }]}>
        <ActivityIndicator size="large" color="#007A86" />
      </View>
    );
  }

  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f2f2f2" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statusDot: { width: 8, height: 8, borderRadius: 5, marginRight: 8 },
  doctor: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1d1d1dff",
    maxWidth: "80%",
  },
  roomNumber: { fontSize: 16, fontWeight: "500", color: "#009f9fff" },
  font: { fontSize: 16, color: "#444", marginVertical: 2 },
  bold: { fontWeight: "600", color: "#222" },
  status: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: { fontWeight: "600", color: "#000", fontSize: 14 },
  statusGreen: { backgroundColor: "#caffd6ff" },
  statusOrange: { backgroundColor: "#fff2caff" },
  statusRed: { backgroundColor: "#ffc0c6ff" },
  button: {
    marginTop: 12,
    marginLeft: "auto",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#009f9fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignSelf: "flex-start",
  },
  buttonSelected: { backgroundColor: "#00cb29ff" },
  buttonDisabled: { backgroundColor: "#888" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
