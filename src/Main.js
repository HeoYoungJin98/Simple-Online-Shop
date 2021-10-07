//상품 등록창 띄우기
document.getElementById("Register_Item").addEventListener("click",Show_window);
function Show_window(){
    document.getElementById("modal").style.display = "flex";
}
//상품 등록창 내리기
document.getElementById("Cancel").addEventListener("click",Close_window);
function Close_window(){
    document.getElementById("modal").style.display = "none";
}
//상품 등록 실패
document.getElementById("Save").addEventListener("click",Check_INF)
function Check_INF(){
    let File = document.getElementById("Choice_image");
    let Name = document.getElementById("Item_Name");
    let Price = document.getElementById("Item_Price");
    let Num = document.getElementById("Item_Num");
}