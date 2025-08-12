// app/(tabs)/createmanually.tsx
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateManuallyScreen() {
  const [form, setForm] = useState({
    hoTen: '',
    cccd: '',
    ngaySinh: '',
    bhyt: '',
    dienThoai: '',
    dienThoaiNguoiThan: '',
    diaChi: '',
    gioiTinh: '',
    lichSuBenh: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Form:', form);
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>*Họ và tên:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập họ tên"
        value={form.hoTen}
        onChangeText={(val) => handleChange('hoTen', val)}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Số CCCD:</Text>
          <TextInput
            style={styles.input}
            placeholder="CCCD"
            value={form.cccd}
            onChangeText={(val) => handleChange('cccd', val)}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>*Ngày sinh:</Text>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/yyyy"
            value={form.ngaySinh}
            onChangeText={(val) => handleChange('ngaySinh', val)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Số BHYT:</Text>
          <TextInput
            style={styles.input}
            placeholder="Không bắt buộc"
            value={form.bhyt}
            onChangeText={(val) => handleChange('bhyt', val)}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput
            style={styles.input}
            placeholder="Không bắt buộc"
            keyboardType="phone-pad"
            value={form.dienThoai}
            onChangeText={(val) => handleChange('dienThoai', val)}
          />
        </View>
      </View>

      <Text style={styles.label}>Số điện thoại người thân:</Text>
      <TextInput
        style={styles.input}
        placeholder="Không bắt buộc"
        keyboardType="phone-pad"
        value={form.dienThoaiNguoiThan}
        onChangeText={(val) => handleChange('dienThoaiNguoiThan', val)}
      />

      <Text style={styles.label}>*Giới tính:</Text>
      <View style={styles.genderRow}>
        <TouchableOpacity
          style={[styles.genderOption, form.gioiTinh === 'Nam' && styles.genderSelected]}
          onPress={() => handleChange('gioiTinh', 'Nam')}
        >
          <Text style={styles.genderText}>Nam</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderOption, form.gioiTinh === 'Nữ' && styles.genderSelected]}
          onPress={() => handleChange('gioiTinh', 'Nữ')}
        >
          <Text style={styles.genderText}>Nữ</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Địa chỉ:</Text>
      <TextInput
        style={[styles.input, { height: 60 }]}
        multiline
        placeholder="Không bắt buộc"
        value={form.diaChi}
        onChangeText={(val) => handleChange('diaChi', val)}
      />

      <Text style={styles.label}>Lịch sử bệnh:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Không bắt buộc"
        value={form.lichSuBenh}
        onChangeText={(val) => handleChange('lichSuBenh', val)}
      />

      <View style={{ marginTop: 24 , marginBottom : 30 }}>
        <Button 
          title="Tạo số khám bệnh tạm thời" 
          onPress={handleSubmit} 
          color="#007A86" 
          />
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fcfcfcff',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  column: {
    flex: 1,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },

  genderOption: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },

  genderSelected: {
    backgroundColor: '#007A86',
    borderRadius: 6,
  },

  genderText: {
    fontWeight: '600',
    color: '#fff',
  },
});
