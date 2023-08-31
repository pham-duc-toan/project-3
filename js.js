// import { fetchApi , unique } from "./fetchapi.js";
//khai báo biến
var i=1;
var str =`http://localhost:3000/products?_page=${i}&_limit=6`;
var cnt=0;
//xây dựng danh mục sản phẩm
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
    })
}
fetchapi(str);


//đếm trang
fetch(str)
    .then((res) => res.json())
    .then((res) => {
        const newArray = res.map((item) => {
            cnt+=1;
            
        })
        console.log(cnt);
    })
//xây dựng danh mục sản phẩm    
fetch("http://localhost:3000/category")
    .then((res) => res.json())
    .then((res) => {
        const newArray = res.map((item) => {
            return `
        <button class="box">
            ${item}
        </button>`;
        })
        // newArrayy=newArray;
        const htmls = newArray.join("");
  
        const products = document.querySelector(".category");
        products.innerHTML = htmls; 
    })

// số trang 
const page = document.querySelector(".page");
page.innerHTML = i;


 
// drop down    
const sort  = document.querySelector("#sort");
sort.onchange = (eve)=>{
    if(eve.target.value=="option1"){
        i=1;
        str = `http://localhost:3000/products?_page=${i}&_limit=6`;
        fetchapi(str);
        page.innerHTML = i;
    }
    else if(eve.target.value=="option2"){
        i=1;
        str = `http://localhost:3000/products?_page=${i}&_limit=6&_sort=price&_order=asc`;
        fetchapi(str);
        page.innerHTML = i;
    }
    else if(eve.target.value=="option3"){
        i=1;
        str = `http://localhost:3000/products?_page=${i}&_limit=6&_sort=price&_order=desc`;
        fetchapi(str);
        page.innerHTML = i;
    }
    else {
        i=1;
        str = `http://localhost:3000/products?_page=${i}&_limit=6&_sort=discountPercentage&_order=desc`;
        fetchapi(str);
        page.innerHTML = i;
    }
}
//phân trang
const pre = document.querySelector(".pre");
const next = document.querySelector(".next");
 pre.onclick = async () =>{
    if(i>1) {
        tmp ="page=" + i.toString();
        tmp2 ="page=" + (i-1).toString();
        i-=1;
        console.log(i,tmp,tmp2);
        str=str.replace(tmp,tmp2);
        page.innerHTML = i;
        await fetchapi(str);
    }
}
let tmp ;
let tmp2 ;
 next.onclick =async () =>{
    if(i<cnt-1){
        tmp ="page=" + i.toString();
        tmp2 ="page=" + (i+1).toString();
        i+=1;
        console.log(i,tmp,tmp2);
        str=str.replace(tmp,tmp2);
        page.innerHTML = i;
        await fetchapi(str);
    }
    
}
