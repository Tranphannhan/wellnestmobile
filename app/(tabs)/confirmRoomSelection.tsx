import { getAllChooseRooms } from "@/services/confirmRoomSelection";
import { receptionTemporaryDoctorTypes } from "@/types/confirmRoomSelection";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

export default function ChooseRoomMobile() {
  const [rooms, setRooms] = useState<receptionTemporaryDoctorTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { idKhoa } = useLocalSearchParams();
  const router = useRouter();

  const MAX_PATIENTS = 10;
  const MINUTES_PER_PATIENT = 15;

  function handleNext(room:string) {
    alert(room);
  }

  useEffect(() => {
    const fetchRooms = async () => {
      if (!idKhoa) return;
      try {
        setLoading(true);
        const data = await getAllChooseRooms(idKhoa as string, 1);
        if (data && data.data) {
          // Sắp xếp theo số người đang khám (ít -> nhiều)
          const sortedRooms = [...data.data].sort(
            (a, b) => a.SoNguoiDangKham - b.SoNguoiDangKham
          );
          setRooms(sortedRooms);
        }
      } catch (error) {
        console.error("Lỗi khi lấy phòng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [idKhoa]);

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
              index === 0 && !isFull && styles.buttonSelected, // phòng ít bệnh nhân nhất => Ưu tiên
            ]}
          >
            <Text
              style={styles.buttonText}
              onPress={()=>{handleNext(item._id)}}
              // router.push("/paymentConfirmation")
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
