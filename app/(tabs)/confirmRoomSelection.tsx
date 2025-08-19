import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Room {
  doctor: string;
  roomNumber: number;
  patients: number;
  maxPatients: number;
  estimateMinutes: number;
}

const rooms: Room[] = [
  {
    doctor: "Nguyễn Đình Huân",
    roomNumber: 108,
    patients: 0,
    maxPatients: 14,
    estimateMinutes: 0,
  },
  {
    doctor: "Trần Văn B",
    roomNumber: 201,
    patients: 5,
    maxPatients: 10,
    estimateMinutes: 15,
  },
];

export default function ChooseRoomMobile() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours} tiếng` : `${hours} tiếng ${mins} phút`;
  };

  const getBadgeStyle = (patients: number, max: number) => {
    const ratio = patients / max;
    if (ratio < 0.3) return styles.statusGreen;
    if (ratio < 0.7) return styles.statusOrange;
    return styles.statusRed;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {rooms.map((room, index) => {
        const isFull = room.patients >= room.maxPatients;
        const isSelected = selectedRoom === room.roomNumber;

        return (
          <View key={index} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.doctor}>{room.doctor}</Text>
              <Text style={styles.roomNumber}>Phòng {room.roomNumber}</Text>
            </View>
            <Text style={styles.font}>
              Số lượng:{" "}
              <Text style={styles.bold}>
                {room.patients}/{room.maxPatients}
              </Text>{" "}
              bệnh nhân
            </Text>
            <Text style={styles.font}>
              Thời gian dự tính:{" "}
              <Text style={styles.bold}>
                {formatTime(room.estimateMinutes)}
              </Text>
            </Text>
            <View
              style={[
                styles.status,
                getBadgeStyle(room.patients, room.maxPatients),
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  room.patients / room.maxPatients < 0.3
                    ? { backgroundColor: "#00ce00" }
                    : room.patients / room.maxPatients < 0.7
                    ? { backgroundColor: "#ff9900" }
                    : { backgroundColor: "#ff3333" },
                ]}
              />
              <Text style={styles.statusText}>
                {room.patients / room.maxPatients < 0.3
                  ? "Ít bệnh nhân"
                  : room.patients / room.maxPatients < 0.7
                  ? "Trung bình"
                  : "Quá tải"}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                isSelected && styles.buttonSelected,
                isFull && styles.buttonDisabled,
              ]}
              disabled={isFull}
              onPress={() => setSelectedRoom(room.roomNumber)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isFull ? "Đã đầy" : isSelected ? "Ưu tiên" : "Chọn phòng"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
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
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  doctor: { fontSize: 18, fontWeight: "600", color: "#333" },
  roomNumber: { fontSize: 16, fontWeight: "500", color: "#666" },
  font: { fontSize: 16, color: "#444", marginVertical: 2 },
  bold: { fontWeight: "600", color: "#222" },
  status: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginTop: 8,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  statusText: { fontWeight: "600", color: "#000000ff", fontSize: 14 },
  statusGreen: { backgroundColor: "#9cffb3ff" },
  statusOrange: { backgroundColor: "#ffe38dff" },
  statusRed: { backgroundColor: "#ff929dff" },
  button: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#009f9fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonSelected: { backgroundColor: "#62ff82ff" },
  buttonDisabled: { backgroundColor: "#888" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
