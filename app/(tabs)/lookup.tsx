import { searchMedicalExaminationBook } from "@/services/lookup";
import { medicalExaminationBook } from "@/types/lookup.type";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PRIMARY_COLOR = "#007A86";

export default function Lookup() {
  const router = useRouter();

  const [valueRender, setValueRender] = useState<medicalExaminationBook[]>([]);
  const [searchPhone, setSearchPhone] = useState<string>(""); // sđt
  const [searchName, setSearchName] = useState<string>(""); // tên bệnh nhân
  const [totalPages, setTotalPages] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAPI = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        if (!searchPhone && !searchName) {
          // 👉 Nếu không nhập gì thì load toàn bộ danh sách
          response = await searchMedicalExaminationBook("", "", totalPages);
        } else {
          // 👉 Nếu có nhập thì search theo input
          response = await searchMedicalExaminationBook(
            searchPhone,
            searchName,
            totalPages
          );
        }

        if (response?.data.length === 0) return setValueRender([]);
        setValueRender(response.data);
      } catch (err: any) {
        console.error("API error:", err);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    loadAPI();
  }, [searchPhone, searchName, totalPages]);

  const renderItem = ({ item }: { item: medicalExaminationBook }) => (
    <View style={styles.card}>
      {/* Thông tin */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.HoVaTen}</Text>
        <Text style={styles.role}>
          {item.GioiTinh} • {item.NgaySinh}
        </Text>
      </View>

      {/* Nút xem chi tiết */}
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() =>
          router.push({
            pathname: "/Patient details",
            params: { id: item._id },
          })
        }
      >
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Ô nhập số điện thoại */}
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại..."
        value={searchPhone}
        onChangeText={setSearchPhone}
        keyboardType="phone-pad"
      />

      {/* Ô nhập tên bệnh nhân */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên bệnh nhân..."
        value={searchName}
        onChangeText={setSearchName}
        keyboardType="default"
      />

      {loading && <ActivityIndicator size="large" color={PRIMARY_COLOR} />}

      {error && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
          {error}
        </Text>
      )}

      {!loading && !error && (
        <FlatList
          data={valueRender}
          keyExtractor={(item) => String(item._id)}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Không tìm thấy kết quả.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8FAFF",
    flex: 1,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 15,
    color: "#000",
  },
  role: {
    fontSize: 13,
    color: "#777",
  },
  detailButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  detailButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
});
