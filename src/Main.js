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
let for_arr_num = 0;
let File_Arr = new Array(0);

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
    if(File == ""){//이미지가 비어 있는 경우
      alert("상품 이미지를 추가하시오.");
    }else if(Res != ".jpg" && Res != ".jpeg" && Res != ".png"){//이미지 확장자가 다른 경우
        alert("이미지 파일이 아닙니다. \'jpg\', \'jpeg\' 또는 \'png\'을 확장자로 가진 파일을 추가하시오.");
    }else if(overlap_check(File) === 1){//중복이 있을 경우
        alert("등록된 상품이 이미 있습니다.");
    }else{
      Image_Check = 1;//모든 경우를 통과한 경우
    }
    //상품 이름 테스트
    if(Name == ""){//이름이 비어있는 경우
      alert("상품 이름을 입력하시오.");
    }else if(num_require.test(Name)){//이름이 숫자로 되어있을 경우
      alert("문자로 된 상품 이름을 입력하시오.");
    }else{
      Name_Check = 1;
    }
    //상품 가격 테스트
    if(Price == ""){//상품 가격이 비어있는 경우
      alert("상품 가격을 입력하시오.");
    }else if(!num_require.test(Price)){//상품가격이 숫자가 아닌 경우
      alert("상품 가격에 숫자를 입력하시오.");
    }else if(Price < 100){//상품 가격이 100원이 넘는 경우
      alert("상품 가격을 100원 이상으로 입력하시오.");
    }else{
      Price_Check = 1;
    }
    //상품 개수 테스트
    if(Num == ""){//개수가 비어있는 경우
      alert("상품 개수를 입력하시오.");
    }else if(!num_require.test(Price)){//개수가 숫자가 아닌 경우
      alert("상품 개수에 숫자를 입력하시오.");
    }else if(Num > 100){//개수가 100개가 넘어갈 경우
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
  for(let i = 0; i<File_Arr.length; i++){//파일의 이름을 저장한 배열을 끝까지 검사
    if(File === File_Arr[i]){//만약 파일이 겹칠 경우
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
  create_box.type = "checkbox";//input 태그의 타입을 체크박스로 지정
  create_box.setAttribute("value",table_number);//setAttribute를 통해 checkbox의 value값을 설정
  create_box.setAttribute("class","box");//class명을 box로한 체크박스를 생성.

  let create_img = document.createElement("img");//이미지 태그 생성
  create_img.setAttribute("src","../images/"+name_res);//이미지 태그의 속성을 설정 이미지 파일은 images 폴더에 존재한다고 가정
  create_img.style.width = 50+'px';//이미지의 넓이를 50픽셀로 설정
  create_img.style.height = 50+'px';//이미지의 높이를 50픽셀로 설정

  let create_input = document.createElement("input");//input태그 생성
  create_input.type = "number";//타입을 숫자로 설정
  create_input.setAttribute("class","input");//태그의 클래스를 설정
  create_input.setAttribute("value",1);//태그의 value를 설정
  create_input.style.width = 70 + 'px';

  Close_window();
  File_Arr.push(File);

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
  let Name_Node = document.createTextNode(Name);
  tbl_row[for_arr_num].appendChild(Name_Node); for_arr_num++;
  let Price_Node = document.createTextNode(Price+"원");
  tbl_row[for_arr_num].appendChild(Price_Node); for_arr_num++;
  tbl_row[for_arr_num].appendChild(create_input);
  tbl_row[for_arr_num].innerHTML += " 개"; for_arr_num++;
  let Sum_Node = document.createTextNode("합계 " + Price + "원");
  tbl_row[for_arr_num].appendChild(Sum_Node); for_arr_num++;
  let Num_Node = document.createTextNode("총 " + Num + "개 남음");
  tbl_row[for_arr_num].appendChild(Num_Node); for_arr_num++;
  table_number++;
}

document.getElementById("Save_btn").addEventListener("click",My_Overlap);//장바구니 담기 클릭 시 중복 여부 체크
let Is_Overlap = 0;
function My_Overlap(){//장바구니에 항목이 존재하는지 조사하는 함수
  let checked = document.getElementsByClassName("box");
  let tbl_row = document.getElementsByTagName("td");
  let i;
  let p;
  for(i=0; i<checked.length; i++){//장바구니에 담으려는 항목이 이미 있는지 조사
    if(checked[i].checked){//체크박스가 체크된 경우에만
      let checked_image = tbl_row[i*7+1].innerHTML;
      let My_Page_table = document.getElementsByClassName("My_table");
      let boxes = document.getElementsByClassName("input");
      let Test = boxes[i].value;
      if(My_Page_table.length === 0){//장바구니가 비어있을 경우
        Reduce_Item(i);//상품정보 안의 상품 개수를 줄이고
        Save_to_my(i);//테이블을 생성하여 장바구니에 담기
      }else{//장바구니가 비어있지 않지만
        for(p=0; (p*6+1)<My_Page_table.length; p++){
          if(checked_image === My_Page_table[p*6+1].innerHTML){//장바구니에 항목이 이미 존재하는 경우
            Is_Overlap = 1;
            break;
          }else{//장바구니에 담으려는 항목이 없는 경우
            Is_Overlap = 0;
          }
        }
        if(Is_Overlap === 1){
          Add_to_my(i,p);//기존 장바구니에 수량만 추가하기
        }else{
          Reduce_Item(i);//상품정보의 상품 개수를 줄이고
          Save_to_my(i);//테이블을 생성하여 장바구니에 담기
        }
      }
    }
  }
  Update_Prev_data();//장바구니의 상품 개수가 담긴 배열 업데이트
}

let Prev_data_array = new Array(0);//이전에 장바구니에 저장된 상품의 개수를 보관할 배열
function Update_Prev_data(){//상품의 개수를 보관한 배열을 업데이트 하는 함수
  let Prev_data = document.getElementsByClassName("My_input_value");
  if(Prev_data_array.length != 0){
    for(let i = 0; i<Prev_data.length; i++){
      Prev_data_array[i] = Prev_data[i].value;//배열의 인덱스 = 장바구니의 상품의 행번호가 된다.
    }
  }
}

function Sum(){//장바구니의 총 합을 구하는 함수
  let boxes = document.getElementsByClassName("My_checkbox");//체크박스의 리스트를 가져옴
  let sum = 0;
  let tbl_col = document.getElementsByClassName("My_table");
  for(let i = 0; (i*6+5)<tbl_col.length; i++){
    if(boxes[i].checked){//체크 박스가 체크된 경우에만
      sum += parseInt(tbl_col[i*6+5].innerHTML);//그 행의 합을 더해 합을 구함
    }
  }
  document.getElementById("sum").innerHTML = sum;//합을 나타내는 곳의 값을 변경함
}

function Add_to_my(i,p){//장바구니에 상품 개수 추가하기(이미 존재하는 경우) i=상품번호 p=장바구니 번호
  let boxes = document.getElementsByClassName("input");
  let My_Page_table = document.getElementsByClassName("My_table");
  let Each_Price = My_Page_table[p*6+3].innerHTML;
  Reduce_Item(i);
  //장바구니 변경
  let My_input = document.getElementsByClassName("My_input_value");
  My_input[p].value = parseInt(My_input[p].value) + parseInt(boxes[i].value);
  My_Page_table[p*6+5].innerHTML = parseInt(My_input[p].value) * parseInt(Each_Price);
  Sum();
}

function Reduce_Item(i){//상품 페이지에서 항목 줄이기,매개변수는 상품 번호(테이블 번호)
  let boxes = document.getElementsByClassName("input");
  let tbl_row = document.getElementsByTagName("td");
  let Each_Price = tbl_row[i*7+3].innerHTML.replace(/[^0-9]/g,"");
  let Prev_Num = tbl_row[i*7+6].innerHTML.replace(/[^0-9]/g,"");
  let Num = boxes[i].value;//장바구니에 추가하고 싶은 수량
  let Res_Num = Prev_Num - Num;//현재의 수량에서 추가할 수량을 뺀다
  tbl_row[i*7+5].innerHTML = "합계 " + Each_Price * Num + "원";//추가하고 싶은 수량의 가격을 나타낸다
  tbl_row[i*7+6].innerHTML = "총 " + Res_Num + "개 남음";//뺀 결과가 남은 수량이 된다.
}

let for_my_table = 0;
function Save_to_my(i){//장바구니에 담기
  let Select_All = document.getElementById("Checkbox");
  Select_All.checked = true;
  let checked = document.getElementsByClassName("box");
  let tbl_row = document.getElementsByTagName("td");
  let Tbody = document.getElementById("body");
  //input 태그 설정
  let checked_image = tbl_row[i*7+1].innerHTML;
  let checked_Name = tbl_row[i*7+2].innerHTML;
  let Each_Price = tbl_row[i*7+3].innerHTML.replace(/[^0-9]/g,"");
  let boxes = document.getElementsByClassName("input");
  let My_Num = boxes[i].value;
  let My_check = document.createElement("input");
  My_check.type = "checkbox";//input의 타입을 체크박스로
  My_check.setAttribute("class","My_checkbox");//클래스를 설정
  My_check.checked = true;//상태를 체크된 상태로 설정

  let My_input = document.createElement("input");//input 생성
  My_input.type = "Text";//타입을 텍스트로
  My_input.setAttribute("class","My_input_value");//클래스 설정
  My_input.setAttribute("value",My_Num);//value를 설정

  let My_button = document.createElement("button");//버튼 생성
  My_button.setAttribute("class","My_input_btn");//클래스 설정
  My_button.innerHTML = "변경";

  let Sum_Price = tbl_row[i*7+5].innerHTML.replace(/[^0-9]/g,"");

  for(let p = 0; p<1; p++){//테이블 생성
    let create_tr = document.createElement("tr");
    Tbody.appendChild(create_tr);
    for(let k=0; k<6; k++){
      let create_td = document.createElement("td");
      create_td.setAttribute("class","My_table");
      create_tr.appendChild(create_td);
    }
  }

  let tbl_col = document.getElementsByClassName("My_table");
  tbl_col[for_my_table].appendChild(My_check); for_my_table++;
      //<img src = .... 에서 이미지 이름만 따오는 함수들
  let img = checked_image.lastIndexOf("/");
  let First_cut = checked_image.substring(checked_image.length,img);
  let img_2 = First_cut.indexOf(" ");
  let Second_cut = First_cut.slice(0,img_2);
  let Final_cut = Second_cut.slice(0,Second_cut.length-1);
  let Create_img = document.createElement("img");
  Create_img.setAttribute("src","../images"+Final_cut);
  Create_img.style.width = 50+"px";
  Create_img.style.height = 50+"px";
  tbl_col[for_my_table].appendChild(Create_img); for_my_table++;
      //
  let Checked_Name_Node = document.createTextNode(checked_Name);
  tbl_col[for_my_table].appendChild(Checked_Name_Node); for_my_table++;
  let Each_Price_Node = document.createTextNode(Each_Price);
  tbl_col[for_my_table].appendChild(Each_Price_Node); for_my_table++;
  tbl_col[for_my_table].appendChild(My_input);
  Prev_data_array.push(My_Num);
  tbl_col[for_my_table].appendChild(My_button); for_my_table++;
  let Sum_Price_Node = document.createTextNode(Sum_Price);
  tbl_col[for_my_table].appendChild(Sum_Price_Node); for_my_table++;
  Sum();
  My_button.addEventListener("click",function(){Change_Value(i)});
  My_check.addEventListener("click",Change_Checkbox);
}

function Change_Value(i){//i=상품번호
  //체크박스가 체크되어 있는지 확인.
  let checkbox = document.getElementsByClassName("My_checkbox");
  let row = 0;
  let Store = document.getElementsByTagName("td");//상품 정보란에 있는 테이블 셀
  let Store_img = Store[i*7+1].innerHTML;//상품번호에 해당하는 이미지를 저장
  let My_Page = document.getElementsByClassName("My_table");//장바구니의 셀
  for(let r = 0; (r*6+1)<My_Page.length; r++){//장바구니를 순회
    let My_Page_img = My_Page[r*6+1].innerHTML;//순회하며 이미지를 저장
    if(Store_img === My_Page_img){//만약 이미지가 같다면
      row = r;//해당 행을 저장
      break;//반복문 종료
    }
  }
  let Prev = parseInt(Prev_data_array[row]);//선택된 행에 해당하는 이전 개수 정보를 가져옴
  let Value = document.getElementsByClassName("My_input_value");//장바구니의 개수를 작성하는 곳을 가져옴
  let pres = parseInt(Value[row].value);//선택된 행에 들어있는 값을 저장
  if(!checkbox[row].checked){//체크박스가 체크되어 있지 않을 경우
    checkbox[row].checked = true;//체크로 변경
    Change_Checkbox();
  }
  prev_Big_or_Small(i,Prev,row);//상품번호와 이전 개수, 현재 개수를 함수에 넘겨줌
  Update_Prev_data();//장바구니의 상품 개수가 담긴 배열 업데이트
}

function prev_Big_or_Small(i,prev,row){
  let tbl_row = document.getElementsByTagName("td");//상품 정보 셀
  let My_Page_table = document.getElementsByClassName("My_table");//장바구니 셀
  let Value = document.getElementsByClassName("My_input_value");//장바구니의 input 태그 셀
  //상품 정보란 변경
  let Each_Price = tbl_row[i*7+3].innerHTML.replace(/[^0-9]/g,"");//개당 가격 가져오기
  let Prev_Num = tbl_row[i*7+6].innerHTML.replace(/[^0-9]/g,"");//상품정보의 남은 수량 가져오기
  let Num = Value[row].value;//현재 장바구니에서 변경할 개수
  let Res_Num = prev - Num; //과거의 개수 - 변경할 개수
  if(Res_Num > 0 || Res_Num < 0 ){//변경하려는 개수가 원래 개수보다 적을 경우
    tbl_row[i*7+6].innerHTML = "총 " + (parseInt(Prev_Num) + parseInt(Res_Num)) + "개 남음";
  }
  //장바구니 변경
  My_Page_table[row*6+5].innerHTML = parseInt(Value[row].value) * parseInt(Each_Price);
  Sum();
}

let Is_All_check = 0;//체크박스가 모두 체크되었는지 확인하기 위한 변수
function Change_Checkbox(){//체크박스 상태 변경
  let boxes = document.getElementsByClassName("My_checkbox");
  for(let i = 0; i<boxes.length; i++){
    if(!boxes[i].checked){//체크가 안 된 체크박스가 있다면
      document.getElementById("Checkbox").checked = false;//전체선택 체크 박스의 체크를 해제하고
      Is_All_check = 0;//전체 체크 상태를 나타낼 변수를 0으로 바꾸며
      break;//반복문 종료
    }else{
      Is_All_check = 1;//아닐경우 전체 체크 상태를 1로 변경
    }
  }
  if(Is_All_check === 1){//만약 모두 체크가 되었다면
    document.getElementById("Checkbox").checked = true;//전체 선택 체크박스를 체크된 상태로 변경
  }
  Sum();//체크박스 상태 변경 시 전체 합 다시 계산할 필요가 있음
}

let All_Check_box = document.getElementById("Checkbox");
All_Check_box.addEventListener("click",All_or_No);//전체 선택 박스를 통해 일괄 체크 또는 해제
function All_or_No(){
  let My_checkbox = document.getElementsByClassName("My_checkbox");
  if(All_Check_box.checked){//전체 선택이 체크된 상태라면
    for(let i = 0; i<My_checkbox.length; i++){
      My_checkbox[i].checked = true;//모든 체크박스를 체크
    }
  }else{//전체 선택이 체크되지 않았다면
    for(let i = 0; i<My_checkbox.length; i++){
      My_checkbox[i].checked = false;//모든 체크박스를 체크 해제
      }
    }
    Sum();//장바구니의 총 가격 계산
  }

let Cancel = document.getElementById("Check_btn")
Cancel.addEventListener("click",Remove);//선택 삭제를 통한 장바구니에서 제거
function Remove(){
  let boxes = document.getElementsByClassName("My_checkbox");//체크박스들을 가져옴
  let Value = document.getElementsByClassName("My_input_value")//장바구니에 선택된 개수를 가져옴
  let tbl_col = document.getElementsByClassName("My_table");
  let store = document.getElementsByTagName("td");
  let r;//장바구니의 행번호를 나타낼 변수 r
  for(r=0; r<boxes.length; r++){
    if(boxes[r].checked){//만약 체크박스가 체크되어 있다면
      let for_connect_img = tbl_col[r*6+1].innerHTML;//해당 행의 두 번째 쉘의 innerHTML로 맞는 상품을 찾기 위함
      for(let i = 0; i<store.length; i++){//상품정보란의 이미지들을 순회하며 비교함
        let store_img = store[i*7+1].innerHTML;//상품정보란의 이미지 저장
        if(for_connect_img === store_img){//두 이미지가 같다면
          let Prev_Num = store[i*7+6].innerHTML.replace(/[^0-9]/g,"");//상품정보의 남은 수량 가져오기
          store[i*7+6].innerHTML = "총 " + (parseInt(Prev_Num) + parseInt(Value[r].value)) + "개 남음";
          break;
        }
      }
      let Remove_table = document.getElementById("body");//장바구니란의 테이블 정보를 가져옴
      Remove_table.deleteRow(r);//해당 열의 테이블 삭제
      Prev_data_array.slice(r,1);//이전 개수를 저장하는 배열에서 정보 삭제
      for_my_table -= 6;//테이블 셀을 나타내는 변수를 줄임
      r = 0;
    }
  }
  Sum();//장바구니의 합 다시 계산
  Update_Prev_data();//이전 개수를 저장하는 배열 업데이트
}
