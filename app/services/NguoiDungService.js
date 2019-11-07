function NguoiDungService (){
  this.themNguoiDung = function(nguoiDung){
    return axios({
      method:"POST",
      url: "http://5dbacb9b3ec5fb00143193d9.mockapi.io/api/NGUOIDUNG",
      data: nguoiDung
    });

  }
  this.layDanhSachNguoiDung = function(){
    // giao thuc GET: lay dsnd ve
    // giao thuc POST: dua dsnd len/ them nguoi dung len server
    // giao thuc PUT: cap nhat nguoi dung len server
    // giao thuc DELETE: xoa nguoi dung
    return axios({  
      // can return nguyen cuc axios thi moi khong bi loi "khong dong bo"
      // Phuong thuc get tu api
      method: "GET",
      // Lay tu dau? link api
      url: "http://5dbacb9b3ec5fb00143193d9.mockapi.io/api/NGUOIDUNG"
    });
  };

  this.xoaNguoiDung = function(id){
    return axios({
      method: "DELETE",
      url: `http://5dbacb9b3ec5fb00143193d9.mockapi.io/api/NGUOIDUNG/${id}`,
    })
  }

  this.layThongTinNguoiDung = function (id){
    return axios({
      method:"GET",
      url: `http://5dbacb9b3ec5fb00143193d9.mockapi.io/api/NGUOIDUNG/${id}`,
    })

  }

  this.capNhatNguoiDung = function(id,nguoiDung){
    return axios({
      method:"PUT",
      url:`http://5dbacb9b3ec5fb00143193d9.mockapi.io/api/NGUOIDUNG/${id}`,
      data: nguoiDung
    })
  }

  this.timKiemNguoiDung = function(chuoiTimKiem, mangNguoiDung){
    // // tao mang rong
    // var mangTimKiem = [];
    // // duyet mang
    // mangNguoiDung.map(function(item){
    //   if(item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase())> -1){
    //     mangTimKiem.push(item);

    //   }
    //   console.log(mangTimKiem);
      
    // })
    // return mangTimKiem;

    // sd ham indexOf de tim, de so sanh, mang tinh tuong doi
    // mangTimKiem.push them nguoi dung vao mang


    // Cach 2 dung filter

    return mangNguoiDung.filter(function(item){
      return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase())> -1 ;
    })
    
  }





}



