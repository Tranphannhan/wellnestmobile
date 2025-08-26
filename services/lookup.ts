
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Danh sách tìm kiếm - tra cứu bệnh nhân
export async function searchMedicalExaminationBook(phone:string,name:string,page:number = 1) {
    console.log(API_BASE_URL);
    try{
        const respone = await fetch(`${'https://bewellnest.onrender.com'}/The_Kham_Benh/TimKiemSoKhamBenh/Pagination?sdt=${phone}&ten=${name}&page=${page}&limit=10000`);
        if(respone.ok){
        return (await respone.json())
        }else{
        console.error("Lỗi Khi Lấy thẻ khám bệnh:");
    }

    }catch(error){
        console.error("Lỗi Khi Lấy thẻ khám bệnh:", error);
        throw error; 
    }
}


// Chi tiết danh sách
export async function patientInformationDetails (id : string) {
    console.log(API_BASE_URL);
    try{
        const respone = await fetch(`https://bewellnest.onrender.com/The_Kham_Benh/Detail/${id}`);
        if(respone.ok){
            return (await respone.json())
        }
        
        else{
            console.error("Lỗi Khi Lấy thẻ khám bệnh:");
        }   
    }
    
    catch(error){
        console.error("Lỗi Khi Lấy thẻ khám bệnh:", error);
        throw error; 
    }
}


// Tìm kiếm bệnh nhân quét mã QR nếu từng đến khám
export async function SearchScanQrCode (cccd : string) {
    const response = await fetch(
      `${'https://bewellnest.onrender.com'}/The_Kham_Benh/TimKiemSoKhamBenh/Pagination?soCCCD=${cccd}`
    );

    if (!response.ok) {
      console.error("Lỗi khi gọi API:", response.status);
      alert("Không thể truy cập dữ liệu. Vui lòng thử lại.");
      return;
    }

    const examination = await response.json();
    return examination;
}

// cập nhât thông tin bệnh nhân 
export async function UpdatePatientInformation(formData: any) {
    const response = await fetch(`https://bewellnest.onrender.com/The_Kham_Benh/Edit/${formData.ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Lỗi cập nhật thông tin");
    return data; // ✅ phải trả về
}
