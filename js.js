// import { fetchApi , unique } from "./fetchapi.js";
//khai báo biến
var i=1;
var str0 = `http://localhost:3000/products?`;
var str =`http://localhost:3000/products?_page=${i}&_limit=6`;
var cnt=0;
var soTrang = (cnt-1) / 6 +1;
// số trang 
const page = document.querySelector(".page");
page.innerHTML = i;



//đếm trang
function demtrang () {
    fetch(str0)
    .then((res) => res.json())
    .then((res) => {
        cnt=0;
        const newArray = res.map((item) => {
            cnt+=1;
            
        })
        console.log(`cnt = ${cnt}`);
        soTrang = (cnt-1) / 6 +1;
        console.log(`sotrang =  ${soTrang}`);
    })
    
    // console.log(soTrang);
    console.log("demtrang");
}
// demtrang();

//xây dựng hàm load lại danh mục sản phẩm
function fetchapi (str){
    fetch(str)
    .then((res) => res.json())
    .then((res) => {
        
        const newArray = res.map((item) => {
            
            return `
            <div class="inner-item">
            <img src="${item.thumbnail}" alt="">
            <div class="title">${item.title}</div>
            <div class="dc">${item.discountPercentage}</div>
            <div class="gia">
                <div class="price">${item.price}$</div>
                <div class="slcl">con lai : ${item.stock} sp</div>
            </div>
        </div>
        
            `;
        })
        
        const htmls = newArray.join("");
        const list = document.querySelector(".list");
        list.innerHTML = htmls; 
        console.log("fetchapi");
        console.log(i);
        demtrang();
    })
}
fetchapi(str);
//xây dựng danh mục sản phẩm    
fetch("http://localhost:3000/category")
    .then((res) => res.json())
    .then((res) => {
        const newArray = res.map((item) => {
            return `
        <button id=${item} class="box">
            ${item}
        </button>`;
        })
        
        // newArrayy=newArray;
        var htmls = newArray.join(""); 
        // console.log(typeof(htmls));
        // console.log(`
        // <button id="all" class="box">
        // All
        // </button>;`);
        htmls = `<button id="all" class="box">
                        All
                    </button>;` + htmls;     
        // console.log(htmls);  
        const products = document.querySelector(".category");
        products.innerHTML = htmls;      
//Lọc theo danh mục sản phẩm
        const box = document.querySelectorAll(".box");
        // console.log(box);
        
        box.forEach(x=>x.addEventListener("click",(e)=>{
            // console.log(e.target.id);
            if(e.target.id!="all"){
                chuyentrang(i,1);
                i=1;
                str= thaythestring(`&category=`,`&category=${e.target.id}`,str);
                str0= thaythestring(`&category=`,`&category=${e.target.id}`,str0);
            }
            else {
                chuyentrang(i,1);
                i=1;
                page.innerHTML = i;
                str0 = `http://localhost:3000/products?`;
                str =`http://localhost:3000/products?_page=${i}&_limit=6`;
            }
            
            demtrang();
            fetchapi(str);
            
        }))
        console.log("xay dung danh muc sp");
    })
    

 
// drop down   

const sort  = document.querySelector("#sort");
sort.onchange = (eve)=>{
    if(eve.target.value=="option1"){
        i=1;
        // str= thaythestring2(`&_sort=`,``,str);
        str =`http://localhost:3000/products?_page=${i}&_limit=6`

        
        // str0= thaythestring2(`&_sort=`,``,str0);
        str0 = `http://localhost:3000/products?`;
        
        fetchapi(str);
        page.innerHTML = i;
    }
    else if(eve.target.value=="option2"){
        i=1;
        str= thaythestring2(`&_sort=`,`&_sort=price&_order=asc`,str);
        str0= thaythestring2(`&_sort=`,`&_sort=price&_order=asc`,str0);
        fetchapi(str);
        page.innerHTML = i;
    }
    else if(eve.target.value=="option3"){
        i=1;
        str= thaythestring2(`&_sort=`,`&_sort=price&_order=desc`,str);
        str0= thaythestring2(`&_sort=`,`&_sort=price&_order=desc`,str0);

        fetchapi(str);
        page.innerHTML = i;
    }
    else {
        i=1;
        str= thaythestring2(`&_sort=`,`&_sort=discountPercentage&_order=desc`,str);
        str0= thaythestring2(`&_sort=`,`&_sort=discountPercentage&_order=desc`,str0);

        fetchapi(str);
        page.innerHTML = i;
    }
    console.log("dropdown sort");
}
//chuyển trang
function chuyentrang (truoc,sau){
    let tmp = "page=" +truoc;
    let tmp2 = "page=" + sau;
    str=str.replace(tmp,tmp2);
    page.innerHTML = sau;
    fetchapi(str);
    console.log("chuyentrang");
}
//phân trang
const pre = document.querySelector(".pre");
const next = document.querySelector(".next");
 pre.onclick = async () =>{
    if(i>1) {
        chuyentrang (i,i-1);
        i=i-1;
    }
    console.log("phan trang - pre");
}

 next.onclick =async () =>{
    if(i<soTrang-1){       
        chuyentrang (i,i+1);
        i+=1;
    }
    console.log("phan trang - next");
}
//ham thay the string 
    // c la loai muon thay the
    // a la string muon thay the
    // str la str
function thaythestring (c,a,str){
    //b la string cũ
    let b ="";
    let start = str.indexOf(c);
    console.log("thaythestring");
    if(start === -1){
        str=str+a;
        // console.log(str);
        return str ;
    }
    // let t = str.indexOf("&_order=");
    let end;
    for (let i=start+1;i<str.length;i++){
        if(str[i+1]=='&'||i==str.length -1){
            end = i;
            break;
        }
    }
    for (let i=start;i<=end;i++){
        b=b+`${str[i]}`;
    }
    // console.log(b);
    str=str.replace(b,a);
    // console.log(str);
    return str;
}
function thaythestring2 (c,a,str){
    //b la string cũ
    let b ="";
    let start = str.indexOf(c);
    console.log("thaythestring2");
    if(start === -1){
        str=str+a;
        // console.log(str);
        return str ;
    }
    let t = str.indexOf("&_order=");
    let end;
    for (let i=t+1;i<str.length;i++){
        if(str[i+1]=='&'||i==str.length -1){
            end = i;
            break;
        }
    }
    for (let i=start;i<=end;i++){
        b=b+`${str[i]}`;
    }
    // console.log(b);
    str=str.replace(b,a);
    // console.log(str);
    return str;
}
//search

const search = document.querySelector("#search");
const valueSearch = document.querySelector("#value-search");
search.addEventListener("click",()=>{
    
    // console.log(valueSearch.value);
    i=1;
    str= thaythestring(`&q=`,`&q=${valueSearch.value}`,str);
    str0= thaythestring(`&q=`,`&q=${valueSearch.value}`,str0);
    demtrang();
    fetchapi(str);
    valueSearch.value="";
    console.log("search");
})
// mỗi lần lọc là cập nhật lại :
    
    // str
    // str0
  
    // fetchapi(str)
    // i
    // chuyentrang
    // valueSearch