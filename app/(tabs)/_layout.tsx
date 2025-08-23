import { IconSymbol } from "@/components/ui/IconSymbol";
import NoRippleButton from "@/components/ui/NoRippleButton";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { router, Tabs } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: {
            paddingTop: 8,
            height: 62,
            backgroundColor: "white",
          },
        }}
      >
        {/* Các tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Trang chủ",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
            tabBarButton: (props) => (
              <NoRippleButton {...(props as BottomTabBarButtonProps)} />
            ),
          }}
        />

        {/* Tra cứu bệnh nhân */}
        <Tabs.Screen
          name="lookup"
          options={{
            title: "Tra cứu",
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" size={24} color={color} />
            ),
            tabBarButton: (props) => (
              <NoRippleButton {...(props as BottomTabBarButtonProps)} />
            ),
          }}
        />

        {/* quét mã QR Code */}
        <Tabs.Screen
          name="qrcode"
          options={{
            title: "Quét mã",
            tabBarStyle: { display: "none" },
            tabBarButton: (props) => (
              <NoRippleButton {...(props as BottomTabBarButtonProps)} />
            ),
            tabBarLabel: () => null,
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("/home")}
              >
                <Ionicons name="arrow-back" size={22} color="#494949" />
                <Text style={styles.backText}></Text>
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused }) => (
              <View style={styles.qrWrapper}>
                <View style={styles.qrButton}>
                  <IconSymbol name="qrcode" color="#fff" size={30} />
                </View>

                <Text
                  style={[styles.qrLabel, { color: focused ? "#000" : "#333" }]}
                >
                  QR Code
                </Text>
              </View>
            ),
          }}
        />

        {/* Tạo thủ công */}
        <Tabs.Screen
          name="createmanually"
          options={{
            title: "Thủ công",
            tabBarIcon: ({ color }) => (
              <Ionicons name="document-text" size={24} color={color} />
            ),
            tabBarButton: (props) => (
              <NoRippleButton {...(props as BottomTabBarButtonProps)} />
            ),
          }}
        />

        {/* Thông tin tài khoản */}
        <Tabs.Screen
          name="acount"
          options={{
            title: "Tài khoản",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
            tabBarButton: (props) => (
              <NoRippleButton {...(props as BottomTabBarButtonProps)} />
            ),
          }}
        />

        {/* Các màn hình phụ */}
        <Tabs.Screen
          name="PatientDetails"
          options={{
            href: null,
            title: "Thông tin bệnh nhân",
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("/lookup")}
              >
                <Ionicons name="arrow-back" size={22} color="#494949" />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="editPatientInformation"
          options={{
            href: null,
            title: "Cập nhật thông tin",
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("/lookup")}
              >
                <Ionicons name="arrow-back" size={22} color="#494949" />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="pay"
          options={{
            href: null,
            title: "Thanh toán",
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("/lookup")}
              >
                <Ionicons name="arrow-back" size={22} color="#494949" />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="paymentConfirmation"
          options={{
            href: null,
            title: "Xác nhận thanh toán",
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("/lookup")}
              >
                <Ionicons name="arrow-back" size={22} color="#494949" />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="enterInformation"
          options={{
            href: null,
            title: "Nhập thông tin phòng",
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("/lookup")}
              >
                <Ionicons name="arrow-back" size={22} color="#494949" />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="confirmRoomSelection"
          options={{
            href: null,
            title: "Chọn phòng khám",
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("/enterInformation")}
              >
                <Ionicons name="arrow-back" size={22} color="#494949" />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="edit account"
          options={{
            href: null,
            title: "Chỉnh sửa thông tin",
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("/acount")}
              >
                <Ionicons name="arrow-back" size={22} color="#494949" />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black", // 👈 chừa khoảng trống đen khi có navigation bar
  },
  qrWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -48,
  },
  qrButton: {
    backgroundColor: "#007A86",
    width: 55,
    height: 55,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  qrLabel: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "800",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    padding: 6,
    borderRadius: 8,
  },
  backText: {
    color: "#1c73cf",
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "500",
  },
});
