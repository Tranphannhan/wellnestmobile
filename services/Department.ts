const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(API_BASE_URL);

// Danh sách khoa
export async function Facultyselectionlist () {
    try{
        const respone = await fetch(`https://bewellnest.onrender.com/Khoa/Pagination?TrangThaiHoatDong=true&limit=1000`);
        if(respone.ok){
            return (await respone.json())
        }
        
        else{
            console.error("Lỗi khi lấy danh sách khoa");
        }   
    }
    
    catch(error){
        console.error("Lỗi khi lấy danh sách khoa", error);
        throw error; 
    }
}
