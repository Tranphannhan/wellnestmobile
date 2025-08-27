import AsyncStorage from "@react-native-async-storage/async-storage";

export interface LoginResponse {
  Data_Token_: string;
  message: string;
}

export class CustomError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "CustomError";
    this.status = status;
  }
}

export async function signInUnified(
  soDienThoai: string,
  matKhau: string,
): Promise<LoginResponse> {
  const url = `https://bewellnest.onrender.com/Tai_Khoan/Login/68272ca038063782b57d386e`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      SoDienThoai: soDienThoai,
      MatKhau: matKhau,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data?.Data_Token_) {
    throw new CustomError(data?.message || "Đăng nhập thất bại", response.status);
  }

  // ✅ Lưu token vào AsyncStorage (React Native)
  try {
    await AsyncStorage.setItem("authToken", data.Data_Token_);
  } catch (err) {
    console.error("Không thể lưu token:", err);
  }

  return data;
}
