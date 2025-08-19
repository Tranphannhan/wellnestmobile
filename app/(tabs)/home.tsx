import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { height, width } = Dimensions.get('window');

export default function Home() {
  const bannerData = [
    { id: 1, image: require('@/assets/images/banner1.webp') },
    { id: 2, image: require('@/assets/images/banner2.webp') },
    { id: 3, image: require('@/assets/images/banner3.jpg') },

  ];
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Phần trên 35% */}
      <View style={{ height: height * 0.35, backgroundColor: '#007A86', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingHorizontal: 16, paddingTop: 50 }}>
        
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Avatar và tên */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://anhnail.com/wp-content/uploads/2024/09/Hinh-gai-xinh-mac-vay-trang-ngan-che-mat.jpg' }}
              style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
            />
            
            <View>
              <Text style={{ color: '#fff', fontSize: 14 }}>Tiếp nhận</Text>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Nguyen Dinh Huan</Text>
            </View>
          </View>

          {/* Icon */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity style={{ backgroundColor: '#ffffff30', padding: 8, borderRadius: 12 }}>
              <Ionicons name="calendar" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#ffffff30', padding: 8, borderRadius: 12 }}>
              <Ionicons name="notifications" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Carousel */}
        <View style={{ marginTop: 20, height: 120 }}>
          <Carousel
            width={width - 32}
            height={120}
            data={bannerData}
            autoPlay
            scrollAnimationDuration={2000}
            renderItem={({ item }) => (
              <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
                <Image source={item.image} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              </View>
            )}
          />
        </View>
      </View>



      {/* Phần dưới trống để phát triển */}
      <View style={{ flex: 1, backgroundColor: '#fff' }} />
    </View>
  );
}
