// app/(tabs)/createmanually.tsx
import { createMedicalExaminationCard } from '@/services/medicalRecord';
import { medicalCardDataType } from '@/types/medicalRecord.type';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: '' }); // clear lỗi khi user gõ lại
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!form.hoTen.trim()) newErrors.hoTen = 'Vui lòng nhập họ và tên';
    if (!form.ngaySinh.trim()) newErrors.ngaySinh = 'Vui lòng nhập ngày sinh';
    if (!form.gioiTinh.trim()) newErrors.gioiTinh = 'Vui lòng chọn giới tính';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const data: medicalCardDataType = {
      name: form.hoTen,
      sex: form.gioiTinh,
      dateOfBirth: form.ngaySinh,
      phone: form.dienThoai,
      CCCDNumber: form.cccd,
      address: form.diaChi,
      BHYT: form.bhyt || '',
      relativePhone: form.dienThoaiNguoiThan || '',
      medicalHistory: form.lichSuBenh || '',
    };

    try {
      setLoading(true);
      const res = await createMedicalExaminationCard(data);

      if (res.ok) {
        setForm({
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
        setErrors({});
        alert('✅ Tạo sổ khám bệnh tạm thời thành công!');
      } else {
        const errText = await res.text();
        alert(`❌ Lỗi: ${errText}`);
      }
    } catch (error) {
      alert('❌ Không thể kết nối đến server');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Họ tên */}
      <Text style={styles.label}>*Họ và tên:</Text>
      <TextInput
        style={[styles.input, errors.hoTen && styles.inputError]}
        placeholder="Nhập họ tên"
        value={form.hoTen}
        onChangeText={(val) => handleChange('hoTen', val)}
      />
      {errors.hoTen && <Text style={styles.errorText}>{errors.hoTen}</Text>}

      {/* CCCD & Ngày sinh */}
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
            style={[styles.input, errors.ngaySinh && styles.inputError]}
            placeholder="dd/mm/yyyy"
            value={form.ngaySinh}
            onChangeText={(val) => handleChange('ngaySinh', val)}
          />
          {errors.ngaySinh && <Text style={styles.errorText}>{errors.ngaySinh}</Text>}
        </View>
      </View>

      {/* BHYT & Điện thoại */}
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

      {/* Người thân */}
      <Text style={styles.label}>Số điện thoại người thân:</Text>
      <TextInput
        style={styles.input}
        placeholder="Không bắt buộc"
        keyboardType="phone-pad"
        value={form.dienThoaiNguoiThan}
        onChangeText={(val) => handleChange('dienThoaiNguoiThan', val)}
      />

      {/* Giới tính */}
      <Text style={styles.label}>*Giới tính:</Text>
      <View style={styles.genderRow}>
        {['Nam', 'Nữ'].map((g) => (
          <TouchableOpacity
            key={g}
            style={[
              styles.genderOption,
              form.gioiTinh === g && styles.genderSelected,
              errors.gioiTinh && !form.gioiTinh && styles.inputError,
            ]}
            onPress={() => handleChange('gioiTinh', g)}
          >
            <Text style={[styles.genderText, form.gioiTinh === g && { color: '#fff' }]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.gioiTinh && <Text style={styles.errorText}>{errors.gioiTinh}</Text>}

      {/* Địa chỉ */}
      <Text style={styles.label}>Địa chỉ:</Text>
      <TextInput
        style={[styles.input, { height: 60 }]}
        multiline
        placeholder="Không bắt buộc"
        value={form.diaChi}
        onChangeText={(val) => handleChange('diaChi', val)}
      />

      {/* Lịch sử bệnh */}
      <Text style={styles.label}>Lịch sử bệnh:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Không bắt buộc"
        value={form.lichSuBenh}
        onChangeText={(val) => handleChange('lichSuBenh', val)}
      />

      {/* Submit */}
      <TouchableOpacity
        style={[styles.submitBtn, loading && { backgroundColor: '#999' }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Tạo sổ khám bệnh tạm thời</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fcfcfc',
    flexGrow: 1,
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
  inputError: {
    borderColor: '#d9534f',
  },
  errorText: {
    color: '#d9534f',
    fontSize: 12,
    marginTop: 2,
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
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: '#007A86',
    borderColor: '#007A86',
  },
  genderText: {
    fontWeight: '600',
    color: '#333',
  },
  submitBtn: {
    marginTop: 32,
    padding: 12,
    marginBottom:30,
    borderRadius: 8,
    backgroundColor: '#007A86',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
