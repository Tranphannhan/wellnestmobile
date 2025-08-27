import { handlePay } from "@/services/pay";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function Pay() {
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "momo">("cash");
  const { name, idPhieuKham } = useLocalSearchParams();
  const router = useRouter();

  async function Pay() {
    const result = await handlePay(idPhieuKham as string);
    if (result?.status === true && result?.QueueNumber) {
      Toast.show({
        type: "success",
        text1: "Thành công 🎉",
        text2: `Thanh toán thành công! Số thứ tự: ${result.QueueNumber}`,
      });
      router.push("/(tabs)/home");
    } else {
      Toast.show({
        type: "error",
        text1: "Thất bại ❌",
        text2: result?.message || "Thanh toán không thành công!",
      });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Thông tin bệnh nhân */}
        <Text style={styles.label}>
          Tên bệnh nhân: <Text style={styles.bold}>{name}</Text>
        </Text>
        <Text style={styles.label}>
          Tổng tiền: <Text style={styles.price}>85.000 VNĐ</Text>
        </Text>

        {/* Phương thức thanh toán */}
        <Text style={styles.label}>Phương thức thanh toán: </Text>
        <View style={styles.methodWrapper}>
          {/* Tiền mặt */}
          <TouchableOpacity
            style={[
              styles.methodBox,
              selectedMethod === "cash" && styles.methodBoxSelected,
            ]}
            onPress={() => setSelectedMethod("cash")}
          >
            <Ionicons name="cash" size={30} color="green" />

            <Text style={styles.methodText}>Tiền mặt</Text>
            {selectedMethod === "cash" && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>

          {/* MoMo */}
          <TouchableOpacity
            style={[
              styles.methodBox,
              selectedMethod === "momo" && styles.methodBoxSelected,
            ]}
            onPress={() => setSelectedMethod("momo")}
          >
            <Ionicons name="wallet" size={30} color="purple" />
            <Text style={styles.methodText}>Chuyển khoản</Text>
            {selectedMethod === "momo" && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Nút cố định dưới */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.btnCancel]}>
          <Text style={styles.btnText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            Pay
          }
          style={[styles.btn, styles.btnConfirm]}
        >
          <Text style={styles.btnText}>Xác nhận thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  methodWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 12,
    gap: 12,
  },
  methodBox: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    position: "relative",
  },
  methodBoxSelected: {
    borderColor: "#007A86",
    backgroundColor: "#eaf5f5",
  },
  icon: {
    width: 45,
    height: 45,
    marginBottom: 8,
    resizeMode: "contain",
  },
  methodText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  check: {
    position: "absolute",
    top: 8,
    right: 10,
    color: "#007A86",
    fontWeight: "bold",
    fontSize: 18,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnCancel: {
    backgroundColor: "#e74c3c",
    flex: 1,
  },
  btnConfirm: {
    backgroundColor: "#007A86",
    flex: 2,
    marginLeft: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
