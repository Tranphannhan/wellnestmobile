import { medicalCardDataType } from './../types/medicalRecord.type';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function createMedicalExaminationCard(data : medicalCardDataType){
    try {
        const result = await fetch(`${'https://bewellnest.onrender.com'}/The_Kham_Benh/Add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                HoVaTen: data.name,
                GioiTinh: data.sex,
                NgaySinh: data.dateOfBirth,
                SoDienThoai: data.phone,
                DiaChi: data.address,
                SoCCCD: data.CCCDNumber,
                SoBaoHiemYTe: data.BHYT || '', 
                SDT_NguoiThan: data.relativePhone || '',
                LichSuBenh: data.medicalHistory || '',
            }),
        });
        return result;
    } catch (error) {
        console.error("Lỗi khi tạo thẻ khám bệnh:", error);
        throw error; 
    }
}