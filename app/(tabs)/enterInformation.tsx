import { Facultyselectionlist } from "@/services/Department";
import { FacultyselectionlistType } from "@/types/Department.type";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EnterInformation() {
  const router = useRouter();
  const [dataDepartment , setDataDepartment] = useState <FacultyselectionlistType []> ([])
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [department, setDepartment] = useState("");
  const [reason, setReason] = useState("");

  useEffect (() => {
      const LoadingAPI = async () => {
          const GetAPI = await Facultyselectionlist ();
          if (GetAPI.data.length === 0) return setDataDepartment ([]);
          setDataDepartment (GetAPI.data)
      }
      
      LoadingAPI ();

  }, []);
 
  return (
      <ScrollView contentContainerStyle={styles.container}>
      {/* Chiều cao */}
      <Text style={styles.label}>Chiều cao (cm)</Text>
      <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholder="Nhập chiều cao"
          placeholderTextColor="#8d8d8dff"
      />

      {/* Cân nặng */}
      <Text style={styles.label}>Cân nặng (kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholder="Nhập cân nặng"
        placeholderTextColor="#8d8d8dff"
      />

      {/* Chọn khoa */}
      <Text style={styles.label}>Chọn khoa</Text>
      <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={department}
            onValueChange={(itemValue) => setDepartment(itemValue)}
          >
              
              <Picker.Item label="--- Chọn khoa ---" value="" />
              {
                  dataDepartment.map ((item , index) => (
                      <Picker.Item 
                          key={item._id}
                          label={item.TenKhoa}
                          value={item._id} 
                      />
                  ))
              }
              
          </Picker>
      </View>

      {/* Lý do đến khám */}
      <Text style={styles.label}>Lý do đến khám</Text>
      <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={reason}
          onChangeText={setReason}
          placeholder="Nhập nội dung..."
          placeholderTextColor="#8d8d8dff"
      />


      {/* Button */}
      <TouchableOpacity 
        style={styles.button}
        // onPress={() => router.push("/confirmRoomSelection")}
        // onPress={() => router.push("/paymentConfirmation")}
        onPress={() => router.push("/pay")}
      >
        
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8FAFF',
  },


  label: {
    color: "#646464ff",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  button: {
    backgroundColor:'#007A86',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});




// onPress={() => router.push("/confirmRoomSelection")}
        // onPress={() => router.push("/paymentConfirmation")}
        // onPress={() => router.push("/pay")}