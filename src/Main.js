//상품 등록창 띄우기
document.getElementById("Register_Item").addEventListener("click",Show_window);
function Show_window(){
    document.getElementById("modal").style.display = "flex";
    Image_Check = 0;
    Name_Check = 0;
    Price_Check = 0;
    Num_Check = 0;
}
//상품 등록창 내리기
document.getElementById("Cancel").addEventListener("click",Close_window);
function Close_window(){
    document.getElementById("modal").style.display = "none";
}

let Image_Check = 0;
let Name_Check = 0;
let Price_Check = 0;
let Num_Check = 0;
let File_Arr = new Array(0);
let Name_Arr = new Array(0);
let Price_Arr = new Array(0);
let Num_Arr = new Array(0);
let for_arr_num = 0;

//상품 등록 검증
document.getElementById("Save").addEventListener("click",Click_Save);
function Click_Save(){
    let File = document.getElementById("Choice_image").value;
    let Name = document.getElementById("Item_Name").value;
    let Price = document.getElementById("Item_Price").value;
    let Num = document.getElementById("Item_Num").value;
    let num_require = /^[0-9]*$/;

    let Image_Len =  File.length;
    let Image_dot = File.lastIndexOf('.');// . 의 위치값을 알려줌.
    let Res = File.substring(Image_Len, Image_dot).toLowerCase();//뒤에서부터 Image_dot 까지 자름. 확장자만 남음.

    let Image_name = File.lastIndexOf('\\');//File은 Fakepath\File_Name으로 구성됨. 뒤에서부터 찾아서 \에서 자름.
    let name_res = File.substring(Image_Len, Image_name+1);//자른 결과에 \가 포홤되기에 제거하기 위해 +1

    //상품 이미지 테스트
    if(File == ""){
      alert("상품 이미지를 추가하시오.");
    }else if(Res != ".jpg" && Res != ".jpeg" && Res != ".png"){
        alert("이미지 파일이 아닙니다. \'jpg\', \'jpeg\' 또는 \'png\'을 확장자로 가진 파일을 추가하시오.");
    }else if(overlap_check(File) === 1){//중복이 있을 경우
        alert("등록된 상품이 이미 있습니다.");
    }else{
      Image_Check = 1;
    }
    //상품 이름 테스트
    if(Name == ""){
      alert("상품 이름을 입력하시오.");
    }else if(num_require.test(Name)){
      alert("문자로 된 상품 이름을 입력하시오.");
    }else{
      Name_Check = 1;
    }
    //상품 가격 테스트
    if(Price == ""){
      alert("상품 가격을 입력하시오.");
    }else if(!num_require.test(Price)){
      alert("상품 가격에 숫자를 입력하시오.");
    }else if(Price < 100){
      alert("상품 가격을 100원 이상으로 입력하시오.");
    }else{
      Price_Check = 1;
    }
    //상품 개수 테스트
    if(Num == ""){
      alert("상품 개수를 입력하시오.");
    }else if(!num_require.test(Price)){
      alert("상품 개수에 숫자를 입력하시오.");
    }else if(Num > 100){
      alert("최대 100개 이하로 입력하시오.");
    }else{
      Num_Check = 1;
    }

    //모두 통과했을 경우
    if(Image_Check === 1 && Name_Check === 1 && Price_Check === 1 && Num_Check === 1){
      Create_Table(File,Name,Price,Num,name_res);//테이블 생성
    }
}
//중복체크 함수
function overlap_check(File){//파일 중복 체크
  for(let i = 0; i<File_Arr.length; i++){
    if(File === File_Arr[i]){
      return 1;
      break;
    }
    else{
      return 0;
    }
  }
}
let table_number = 0
let for_check_box = new Array(0);
//상품 테이블 생성
function Create_Table(File,Name,Price,Num,name_res){
  let Table = document.getElementById("Items");
  let create_tb = document.createElement("table");
  create_tb.setAttribute("class","Item_Table");
  Table.appendChild(create_tb);

  let create_tr = document.createElement("tr");
  let create_td = document.createElement("td");

  let create_box = document.createElement("input");
  create_box.type = "checkbox";
  create_box.setAttribute("value",table_number);
  create_box.setAttribute("class","box");

  let create_img = document.createElement("img");
  create_img.setAttribute("src","../images/"+name_res);
  create_img.style.width = 50+'px';
  create_img.style.height = 50+'px';

  let create_input = document.createElement("input");
  create_input.type = "number";
  create_input.setAttribute("class","input");
  create_input.setAttribute("value",1);
  create_input.innerHTML = "개";
  create_input.setAttribute("oninput","Add_Event()");

  Close_window();
  File_Arr.push(File);
  Name_Arr.push(Name);
  Price_Arr.push(Price);
  Num_Arr.push(Num);

  for (i = 0; i < 7; i++) {
      let create_tr = document.createElement("tr");
      create_tb.appendChild(create_tr);
      for (p = 0; p < 1; p++) {
          let create_td = document.createElement("td");
          create_tr.appendChild(create_td);
      }
  }

  let tbl_row = document.getElementsByTagName("td");
  tbl_row[for_arr_num].appendChild(create_box); for_arr_num++;
  tbl_row[for_arr_num].appendChild(create_img); for_arr_num++;
  tbl_row[for_arr_num].innerHTML = Name; for_arr_num++;
  tbl_row[for_arr_num].innerHTML = Price + "원"; for_arr_num++;
  tbl_row[for_arr_num].appendChild(create_input); for_arr_num++;
  tbl_row[for_arr_num].innerHTML = "합계 " + Price + "원"; for_arr_num++;
  tbl_row[for_arr_num].innerHTML = "총 " + Num + "개 남음"; for_arr_num++;
  table_number++;
}

function Add_Event(){
  for_check_box.push(0);
  let boxes = document.getElementsByClassName("input");
  for(let i = 0; i<boxes.length; i++){
    boxes[i].addEventListener("oninput",Change_Value(i));
  }
}

function Change_Value(a){
  console.log(a);
  let boxes = document.getElementsByClassName("input");
  let tbl_row = document.getElementsByTagName("td");
  let remaining = tbl_row[a*7+6].innerHTML.replace(/[^0-9]/g,"");
  if(remaining >= boxes[a].value){
    let changed = boxes[a].value;
    for_check_box[a] = changed;
  }else{
    alert("장바구니에 담으려는 수량이 남은 수량보다 많습니다.");
    boxes[a].value = boxes[a].value - 1;
  }
}

document.getElementById("Save_btn").addEventListener("click",Reduce_Item);
document.getElementByID("Save_btn").addEventListener("click",Save_to_my);
function Reduce_Item(){
  let checked = document.getElementsByClassName("box");
  for(let i = 0; i<checked.length; i++){
    if(checked[i].checked){//체크박스가 체크된 경우 1을 리턴
      let tbl_row = document.getElementsByTagName("td");
      let Each_Price = tbl_row[i*7+3].innerHTML.replace(/[^0-9]/g,"");
      let Prev_Num = tbl_row[i*7+6].innerHTML.replace(/[^0-9]/g,"");
      let Num = for_check_box[i];
      let Res_Num = Prev_Num - Num;
      tbl_row[i*7+5].innerHTML = "합계 " + Each_Price * Num + "원";
      tbl_row[i*7+6].innerHTML = "총" + Res_Num + "개 남음";
    }
  }
}

function Save_to_my(){

}
