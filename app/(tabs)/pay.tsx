import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

export default function Pay() {
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "momo">("cash");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Thông tin bệnh nhân */}
      <Text style={styles.label}>
        Tên bệnh nhân: <Text style={styles.bold}>Nguyễn Thị Hồng Nhung</Text>
      </Text>
      <Text style={styles.label}>
        Tổng tiền: <Text style={styles.price}>85.000 VNĐ</Text>
      </Text>

      {/* Phương thức thanh toán */}
      <Text style={styles.label}>Phương thức thanh toán</Text>
      <View style={styles.methodWrapper}>
        {/* Tiền mặt */}
        <TouchableOpacity
          style={[
            styles.methodBox,
            selectedMethod === "cash" && styles.methodBoxSelected,
          ]}
          onPress={() => setSelectedMethod("cash")}
        >
          <Image
            source={{ uri: "https://img.icons8.com/fluency/96/money.png" }}
            style={styles.icon}
          />
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
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.methodText}>MoMo</Text>
          {selectedMethod === "momo" && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>
      </View>

      {/* Nút hành động */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.btnCancel]}>
          <Text style={styles.btnText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnConfirm]}>
          <Text style={styles.btnText}>Xác nhận thanh toán</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  methodBox: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
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
    marginTop: 30,
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnCancel: {
    backgroundColor: "#e74c3c",
    flex: 1, // nhỏ hơn
    marginRight: 10,
  },
  btnConfirm: {
    backgroundColor: "#007A86",
    flex: 2, // to hơn
    marginLeft: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
