import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

interface DecodedToken {
  _id: string;
  _TenTaiKhoan: string;
  _SoDienThoai: string;
  _SoCCCD: string;
  _Image: string;
  _Id_LoaiTaiKhoan: {
    VaiTro: string;
  };
  iat: number;
  exp: number;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);

  const bannerData = [
    { id: 1, image: require("@/assets/images/banner1.webp") },
    { id: 2, image: require("@/assets/images/banner2.webp") },
    { id: 3, image: require("@/assets/images/banner3.jpg") },
  ];

  const features = [
    {
      id: 1,
      icon: "qr-code-outline",
      title: "Quét QR",
      desc: "Tiếp nhận nhanh thông tin bệnh nhân",
      route: "/qrcode",
    },
    {
      id: 2,
      icon: "medkit-outline",
      title: "Khám bệnh",
      desc: "Tạo phiếu khám, chọn phòng & loại hình",
      route: "/examination",
    },
    {
      id: 3,
      icon: "cash-outline",
      title: "Thanh toán",
      desc: "Xác nhận & quản lý chi phí khám chữa",
      route: "/payment",
    },
    {
      id: 4,
      icon: "document-text-outline",
      title: "Phiếu khám",
      desc: "Quản lý kết quả khám & lịch sử điều trị",
      route: "/records",
    },
  ];

  // 🔹 Lấy user từ token
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          height: 300,
          backgroundColor: "#007A86",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 16,
          paddingTop: 50,
        }}
      >
        {/* Thông tin user */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Avatar + tên */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri:`https://bewellnest.onrender.com/image/${user?._Image}`,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 12,
                backgroundColor: "#ccc",
              }}
            />

            <View>
              <Text style={{ color: "#fff", fontSize: 14 }}>
                {"Tiếp nhận"}
              </Text>
              <Text
                style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                numberOfLines={1}
              >
                {user?._TenTaiKhoan || "Người dùng"}
              </Text>
            </View>
          </View>

          {/* Icon bên phải */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#ffffff30",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Ionicons name="calendar" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#ffffff30",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Ionicons name="notifications" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Carousel banner */}
        <View
          style={{
            marginTop: 20,
            borderRadius: 16,
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          <Carousel
            loop
            width={width}
            height={180}
            autoPlay
            autoPlayInterval={3000}
            data={bannerData}
            scrollAnimationDuration={1000}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.8,
              parallaxScrollingOffset: 95,
            }}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />
            )}
          />
        </View>
      </View>

      {/* Danh sách chức năng */}
      <View
        style={{
          flex: 1,
          padding: 20,
          paddingBottom: 40,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 16,
              color: "#2c3e50",
            }}
          >
            Chức năng nổi bật
          </Text>

          {features.map((f) => (
            <TouchableOpacity
              key={f.id}
              onPress={() => router.push('/(tabs)/home')}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
                backgroundColor: "#f8f9fa",
                padding: 12,
                borderRadius: 12,
                elevation: 2,
              }}
            >
              <Ionicons
                name={f.icon as any}
                size={28}
                color="#007A86"
                style={{ marginRight: 16 }}
              />
              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#007A86" }}
                >
                  {f.title}
                </Text>
                <Text style={{ fontSize: 13, color: "#555" }}>{f.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nút bắt đầu */}
        <TouchableOpacity
          onPress={() => router.push("/qrcode")}
          style={{
            backgroundColor: "#007A86",
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Bắt đầu ngay
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
