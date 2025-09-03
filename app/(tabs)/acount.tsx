import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";

interface DecodedToken {
  _id: string;
  _TenTaiKhoan: string;
  _SoDienThoai: string;
  _SoCCCD: string;
  _Image: string;
  _NamSinh?: string;
  _GioiTinh?: string;
  _Id_LoaiTaiKhoan: {
    VaiTro: string;
    TenLoaiTaiKhoan?: string;
  };
  iat: number;
  exp: number;
}

export default function Account() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    TenTaiKhoan: "",
    SoDienThoai: "",
    SoCCCD: "",
    GioiTinh: "",
  });
  const router = useRouter();

  // Hàm tải và giải mã dữ liệu người dùng từ AsyncStorage
  const loadUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        console.log("Token giải mã:", decoded); // Debug token
        setUser(decoded);
        setEditForm({
          TenTaiKhoan: decoded._TenTaiKhoan || "",
          SoDienThoai: decoded._SoDienThoai || "",
          SoCCCD: decoded._SoCCCD || "",
          GioiTinh: decoded._GioiTinh || "",
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Lỗi giải mã token:", err);
      Alert.alert("Lỗi", "Không thể tải thông tin người dùng!");
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleEditInfo = () => {
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token || !user) {
        Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng!");
        return;
      }

      const response = await fetch(
        `https://bewellnest.onrender.com/Tai_Khoan/Edit/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            TenTaiKhoan: editForm.TenTaiKhoan,
            SoDienThoai: editForm.SoDienThoai,
            SoCCCD: editForm.SoCCCD,
            GioiTinh: editForm.GioiTinh,
          }),
        }
      );

      if (response.ok) {
        const updatedToken = await response.json();
        console.log("Phản hồi API:", updatedToken); // Debug phản hồi
        await AsyncStorage.setItem("authToken", updatedToken.token);
        await loadUserData(); // Tải lại dữ liệu người dùng để cập nhật UI
        setEditModalVisible(false);
        Alert.alert("Thành công", "Thông tin đã được cập nhật!");
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Lỗi",
          errorData.message || "Không thể cập nhật thông tin!"
        );
      }
    } catch (err) {
      console.error("Lỗi gọi API:", err);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setUser(null);
      setEditForm({
        TenTaiKhoan: "",
        SoDienThoai: "",
        SoCCCD: "",
        GioiTinh: "",
      });
      router.replace("/login");
    } catch (err) {
      console.error("Lỗi xóa token:", err);
      Alert.alert("Lỗi", "Không thể đăng xuất!");
    }
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} key={user?._id || "default"}>
      {" "}
      {/* Thêm key để buộc re-render nếu cần */}
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleEditInfo} style={styles.editIcon}>
            <Ionicons name="create-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri: `https://bewellnest.onrender.com/image/${user._Image}`,
          }}
          style={styles.avatar}
          onError={() => console.log("Lỗi tải ảnh")} // Debug lỗi tải ảnh
        />
        <Text style={styles.name}>{user._TenTaiKhoan}</Text>
        <Text style={styles.role}>{user._Id_LoaiTaiKhoan?.VaiTro}</Text>
      </View>
      {/* Thông tin cá nhân */}
      <View style={styles.infoBox}>
        <InfoRow
          icon="call-outline"
          label="Số điện thoại"
          value={user._SoDienThoai}
        />
        <InfoRow icon="card-outline" label="CCCD" value={user._SoCCCD} />
        {user._NamSinh && (
          <InfoRow
            icon="calendar-outline"
            label="Năm sinh"
            value={user._NamSinh}
          />
        )}
        {user._GioiTinh && (
          <InfoRow
            icon="male-outline"
            label="Giới tính"
            value={user._GioiTinh}
          />
        )}
      </View>
      {/* Nút chức năng */}
      <View style={styles.actionBox}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      {/* Modal chỉnh sửa thông tin */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>

            <Text style={styles.inputLabel}>Tên tài khoản</Text>
            <TextInput
              style={styles.input}
              value={editForm.TenTaiKhoan}
              onChangeText={(text) =>
                setEditForm({ ...editForm, TenTaiKhoan: text })
              }
            />

            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              value={editForm.SoDienThoai}
              onChangeText={(text) =>
                setEditForm({ ...editForm, SoDienThoai: text })
              }
            />

            <Text style={styles.inputLabel}>Số CCCD</Text>
            <TextInput
              style={styles.input}
              value={editForm.SoCCCD}
              onChangeText={(text) =>
                setEditForm({ ...editForm, SoCCCD: text })
              }
            />

            <Text style={styles.inputLabel}>Giới tính</Text>
            <TextInput
              style={styles.input}
              value={editForm.GioiTinh}
              onChangeText={(text) =>
                setEditForm({ ...editForm, GioiTinh: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#007A86" }]}
                onPress={handleSaveEdit}
              >
                <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <View style={styles.infoRow}>
    <Ionicons
      name={icon}
      size={20}
      color="#007A86"
      style={{ marginRight: 10 }}
    />
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA" },
  header: {
    backgroundColor: "#007A86",
    paddingVertical: 20,
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: "relative",
  },
  headerTop: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  editIcon: {
    backgroundColor: "#007A86",
    padding: 8,
    borderRadius: 50,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  role: { fontSize: 14, color: "#e0e0e0" },
  infoBox: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontWeight: "600", color: "#444" },
  value: { color: "#333", fontSize: 14 },
  actionBox: { marginTop: 30, marginHorizontal: 16, gap: 12 },
  logoutButton: {
    backgroundColor: "#4d4d4d",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    justifyContent: "center",
    borderRadius: 10,
    gap: 8,
  },
  logoutButtonText: { color: "#fff", fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
