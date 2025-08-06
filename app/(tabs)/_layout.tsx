import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lookup"
        options={{
          title: 'Tra cứu',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="search.circle.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="qrcode"
        options={{
          title: 'QR Code',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="qrcode" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="createmanually"
        options={{
          title: 'Thủ công',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="hammer.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="acount"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person.crop.circle" color={color} />
          ),
        }}
      />


    </Tabs>
  );
}
