
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Danh sách tìm kiếm - tra cứu bệnh nhân
export async function searchMedicalExaminationBook(phone:string,name:string,page:number = 1) {
    console.log(API_BASE_URL);
    try{
        const respone = await fetch(`${'https://bewellnest.onrender.com'}/The_Kham_Benh/TimKiemSoKhamBenh/Pagination?sdt=${phone}&ten=${name}&page=${page}&limit=15`);
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

