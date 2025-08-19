import { IconSymbol } from '@/components/ui/IconSymbol';
import NoRippleButton from '@/components/ui/NoRippleButton';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { router, Tabs } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >

      {/* Các tab */}
     <Tabs.Screen
        name="home"
        options={{
          title: 'Trang chủ',
          headerShown: false, // 👈 Thêm dòng này
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} />,
          tabBarButton: (props) => <NoRippleButton {...(props as BottomTabBarButtonProps)} />,
        }}
      />


      <Tabs.Screen
        name="lookup"
        options={{
          title: 'Tra cứu',
          tabBarIcon: ({ color }) => <IconSymbol name="search.circle.fill" color={color} />,
          tabBarButton: (props) => <NoRippleButton {...(props as BottomTabBarButtonProps)} />,
        }}
      />

      <Tabs.Screen
        name="qrcode"
        options={{
          title: '',
          tabBarButton: (props) => <NoRippleButton {...(props as BottomTabBarButtonProps)} />,
          tabBarIcon: ({ focused }) => (
            <View style={styles.qrWrapper}>
              <View style={styles.qrButton}>
                <IconSymbol name="qrcode" color="#fff" size={30} />
              </View>
              <Text style={[styles.qrLabel, { color: focused ? '#000' : '#333' }]}>QR Code</Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="createmanually"
        options={{
          title: 'Thủ công',
          tabBarIcon: ({ color }) => <IconSymbol name="hammer.fill" color={color} />,
          tabBarButton: (props) => <NoRippleButton {...(props as BottomTabBarButtonProps)} />,
        }}
      />

      <Tabs.Screen
        name="acount"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => <IconSymbol name="person.crop.circle" color={color} />,
          tabBarButton: (props) => <NoRippleButton {...(props as BottomTabBarButtonProps)} />,
        }}
      />

      <Tabs.Screen
        name="Patient details"
        options={{
          href: null,
          title: 'Thông tin bệnh nhân',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace('/lookup')} // Luôn điều hướng về tab Tra cứu
            >
              <Ionicons name="arrow-back" size={22} color="#494949" />
              <Text style={styles.backText}></Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Nhập thông tin phòng */}
      <Tabs.Screen
        name="enterInformation"
        options={{
          href: null,
          title: 'Nhập thông tin phòng',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace('/lookup')} // Luôn điều hướng về tab Tra cứu
            >
              <Ionicons name="arrow-back" size={22} color="#494949" />
              <Text style={styles.backText}></Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Chọn phòng - */}
       <Tabs.Screen
        name="confirmRoomSelection"
        options={{
          href: null,
          title: 'Chọn phòng khám',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace('/enterInformation')} // Luôn điều hướng về tab Tra cứu
            >
              <Ionicons name="arrow-back" size={22} color="#494949" />
              <Text style={styles.backText}></Text>
            </TouchableOpacity>
          ),
        }}
      />


       {/* Màn hình chi tiết bệnh nhân */}
      <Tabs.Screen
        name="edit account"
        options={{
          href: null,
          title: 'Chỉnh sửa thông tin',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace('/acount')} // Luôn điều hướng về tab Tra cứu
            >
              <Ionicons name="arrow-back" size={22} color="#494949" />
              <Text style={styles.backText}></Text>
            </TouchableOpacity>
          ),
        }}
      />


    </Tabs>
  );
}

const styles = StyleSheet.create({
  qrWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -48,
  },

  qrButton: {
    backgroundColor: '#007A86',
    width: 55,
    height: 55,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },

  qrLabel: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '800',
  },
  
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 6,
    borderRadius: 8,
  },
  
  backText: {
    color: '#1c73cf',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
});
