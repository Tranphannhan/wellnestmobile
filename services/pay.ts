export async function handlePay(id:string){

    try {
        const response = await fetch(`https://bewellnest.onrender.com/Phieu_Kham_Benh/Xacnhanthanhtoan/${id}`,
            {method:'PATCH'}
        )
        if(response.ok){
            const data = await response.json();
            const queueNumber = data?.data?.STTKham;
            if (queueNumber) {
                return ({
                    message: data.message || 'Thanh toán thành công',
                    status: true,
                    QueueNumber: queueNumber
                })
            }
            return ({
                message: data?.message || 'Không nhận được số thứ tự sau thanh toán',
                status: false,
            })
        }
        return ({
            message: 'Thanh toán thất bại',
            status: false
        })
    } catch{
        return ({
                message:'Lỗi server khi thanh toán',
                status:false
        })
    }
     
  }