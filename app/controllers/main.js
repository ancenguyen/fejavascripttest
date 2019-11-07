
var nguoiDungService = new NguoiDungService();
getListUser();

getEle("btnThemNguoiDung").addEventListener("click",function(){
  var title = "Them Nguoi Dung";
  var footer = `
    <button class="btn btn-success" onclick = "themNguoiDung()">Them </button>
  `;
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  
});

// them nguoi dung
function themNguoiDung(){
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDung = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,maLoaiNguoiDung);

  nguoiDungService.themNguoiDung(nguoiDung)
  .then(function(result){
    console.log(result);
    // co the dung location.reload de theo singlepage
    getListUser();

  })
  .catch(function(error){
    console.log(error);
  })
}


function getListUser(){
  nguoiDungService.layDanhSachNguoiDung()
  // neu promise dung, tra ve result: .then
  .then(function(result){
    console.log(result.data);
    this.mangNguoiDung = result.data;
    setLocalStorage(result.data);
    renderTable(result.data);
  })
  // neu promise k thuc hien duoc, tra ve error: .catch
  .catch(function(error){
    if(error.response.status === 404){alert("ma nguoi dung sai roi")};
    // switch (error.reponse.status) {
    //   case value:
        
    //     break;
    
    //   default:
    //     break;
    // }
  });
  

}


// Dom den nut:
  // function na (){}
  // document.getElementsById("id").addEventListener("click",function(){});
  // document.getElementsById("id").addEventListener("click",na());



// Luu mang nguoi dung xuong LocalStorage, can luu thanh JSON.stringify
function setLocalStorage(mangNguoiDung){
  localStorage.setItem("DanhSachNguoiDung",JSON.stringify(mangNguoiDung));
} 
function getLocalStorage(){
  if(localStorage.getItem("DanhSachNguoiDung")){
    return JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
  }
}

// Chuc nang xoa
function xoa(id){
  nguoiDungService.xoaNguoiDung(id)
    .then(function(result){
      getListUser();
    })
    .catch(function(error){
      console.log(error);
    })
}

function sua(id){
  var title = "Sua Nguoi Dung";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  var footer = `
  <button class = "btn btn-success" onclick = "capNhat(${id})">Cap nhat</button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  nguoiDungService.layThongTinNguoiDung(id)
  .then(function(result){
    // set disable thong qua setAttribute
    getEle("TaiKhoan").setAttribute("disabled",true);
    
    getEle("HoTen").value = result.data.hoTen;
    getEle("MatKhau").value = result.data.matKhau;
    getEle("Email").value = result.data.email;
    getEle("SoDienThoai").value = result.data.soDT;
    getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;

  })
  .catch(function(error){
    console.log(error);
  })

    
}
function capNhat(id){
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var maLoaiNguoiDung = getEle("loaiNguoiDung").value;
  
  var nguoiDung2 = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,maLoaiNguoiDung);
  nguoiDungService
  .capNhatNguoiDung(id,nguoiDung2)
  .then (function(result){getListUser(result);})
  .catch(function(error){console.log(error);})
}


// Chuc nang tim kiem
getEle("txtSearch").addEventListener("keyup",function(){
  var chuoiTimKiem = getEle("txtSearch").value;
  var mangNguoiDung = getLocalStorage();
  console.log(mangNguoiDung);

  var mangTimKiem = nguoiDungService.timKiemNguoiDung(
    chuoiTimKiem,
    mangNguoiDung
  )
  console.log(mangTimKiem);
  
  renderTable(mangTimKiem);

})


function getEle(id){
  return document.getElementById(id);
}

function renderTable (mangNguoiDung){
  var contentHTML = "";
  mangNguoiDung.map(function(item,index){
    contentHTML+= `
    <tr>
      <td>${index +1}</td>
      <td>${item.taiKhoan}</td>
      <td>${item.matKhau}</td>
      <td>${item.hoTen}</td>
      <td>${item.email}</td>
      <td>${item.soDT}</td>
      <td>${item.maLoaiNguoiDung}</td>
      <td>
        <button class ="btn btn-info" data-toggle= "modal" data-target= "#myModal" onclick="sua(${item.id})" >Sua</button>
        <button class = "btn btn-danger" onclick="xoa(${item.id})">Xoa</button>
      </td>
    </tr>
    `;

  });
  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}