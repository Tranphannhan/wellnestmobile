export async function getAllChooseRooms (_id : string,currentPage:number) {
    try {
        const result = await fetch(`https://bewellnest.onrender.com/Bacsi/LayTheoKhoa/Pagination/${_id}?page=${currentPage}&limit=1000`);
        if (result){
            return result.json ();
        }
    } catch (error) {
        console.error("Lỗi Khi Lấy Khoa:", error);
        throw error; 
    }
}