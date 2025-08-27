import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router"; // 👈 thêm

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
  const router = useRouter(); // 👈 hook điều hướng

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decoded: DecodedToken = jwtDecode(token);
          setUser(decoded);
        }
      } catch (err) {
        console.error("Decode token lỗi:", err);
      }
    })();
  }, []);

  const handleEditInfo = () => {
    alert("Chức năng sửa thông tin");
  };

  async function signOut() {
    try {
      await AsyncStorage.removeItem("authToken");
      setUser(null);
      router.replace("/login"); // 👈 điều hướng về login
    } catch (err) {
      console.error("Không thể xóa token:", err);
    }
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
        />
        <Text style={styles.name}>{user._TenTaiKhoan}</Text>
        <Text style={styles.role}>{user._Id_LoaiTaiKhoan?.VaiTro}</Text>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.infoBox}>
        <InfoRow icon="call-outline" label="Số điện thoại" value={user._SoDienThoai} />
        <InfoRow icon="card-outline" label="CCCD" value={user._SoCCCD} />
        {user._NamSinh && (
          <InfoRow icon="calendar-outline" label="Năm sinh" value={user._NamSinh} />
        )}
        {user._GioiTinh && (
          <InfoRow icon="male-outline" label="Giới tính" value={user._GioiTinh} />
        )}
      </View>

      {/* Nút chức năng */}
      <View style={styles.actionBox}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
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
    <Ionicons name={icon} size={20} color="#007A86" style={{ marginRight: 10 }} />
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
    backgroundColor: "#4d4d4dff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    justifyContent: "center",
    borderRadius: 10,
    gap: 8,
  },
  logoutButtonText: { color: "#fff", fontSize: 16 },
});
