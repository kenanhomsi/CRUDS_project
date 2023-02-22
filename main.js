//get inputs elements//initiliz
let title=document.getElementById("title");
let price=document.getElementById('input-price');
let tax=document.getElementById('tax');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count =document.getElementById('count');
let category=document.getElementById('category');
let create=document.getElementById('create');
let mood='create';
let temp;
let SearchMood='title';
price.onkeyup=(e)=>{
    GetTotal();
}
tax.onkeyup=(e)=>{
    GetTotal();
}
ads.onkeyup=(e)=>{
    GetTotal();
}
discount.onkeyup=(e)=>{
    GetTotal();
}



//get total
function GetTotal(){
    if(price.value != ''){
        let result=(+price.value + +tax.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor='#0f5111'
    }
    else{
        total.innerHTML='';
        total.style.backgroundColor='#4caf50'
    }
}
//create product//saving in local storeg
let AllProducts;
if(localStorage.product !=null){
    AllProducts=JSON.parse(localStorage.product);
}else{
    AllProducts=[];
}
create.onclick=()=>{
    let NewProduct={
        title:title.value.toLowerCase(),
        price:price.value,
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title !=' '&&
    price!=" "&&
    category!=' '){
        
        if(mood==='create'){
            for(let i=0;i<= +count.value-1;i++){
                AllProducts.push(NewProduct);
            }
            if(count.value ===''){
                AllProducts.push(NewProduct);
            }

        }
        else{
            AllProducts[temp]=NewProduct;
            count.style.display='block';
            create.innerHTML='create';
            mood='create';
    
        }
        clearData();
        localStorage.setItem('product',JSON.stringify(AllProducts));
        
    }
    else{
        console.log("kenan");
    }
    ShowData();
}

//clear data after submit
function clearData(){
    title.value="";
    price.value="";
    tax.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}
//read data
function ShowData(){
    let table=' ';
    for(let i=0;i<AllProducts.length;i++){
        table +=`
        <tr>
                    <td>${i+1}</td>
                    <td>${AllProducts[i].title}</td>
                    <td>${AllProducts[i].price}</td>
                    <td>${AllProducts[i].tax}</td>
                    <td>${AllProducts[i].ads}</td>
                    <td>${AllProducts[i].discount}</td>
                    <td>${AllProducts[i].total}</td>
                    <td>${AllProducts[i].category}</td>
                    <td><button id="updata" onclick="UpdateData(${i})" >updata</button></td>
                    <td><button id="delete" onclick="DeleteData(${i}) ">delete</button></td>
                </tr>
        `
    }
        let deletediv=document.querySelector("#deleteAll");
    if(AllProducts.length>0){
        
        deletediv.innerHTML=`<button id="delete" onclick="deleteAll()">Delete All Data ${ AllProducts.length}</button>`
    }else{
        deletediv.innerHTML='';
    }
    document.getElementById('tbody').innerHTML=table;
}

ShowData();

//delete

function DeleteData(i){
    AllProducts.splice(i,1);
    localStorage.product=JSON.stringify(AllProducts);
    ShowData();
}
function deleteAll(){
    localStorage.clear();
    AllProducts.splice(0);
    ShowData();
}
//updata
function UpdateData(i){
title.value=AllProducts[i].title;
price.value=AllProducts[i].price;
tax.value=AllProducts[i].tax;
ads.value=AllProducts[i].ads;
discount.value=AllProducts[i].discount;
GetTotal();
count.style.display='none';
category.value=AllProducts[i].category;
create.innerHTML='updata';
mood='updata';
temp=i;
scroll({
    top:0,
    behavior:'smooth',
})
}
//search
function   GetsearchMood(id){
    let searchbox=document.querySelector('.search');
    if(id ==='search_title'){
        SearchMood='title';
    }else{
        SearchMood='category';
    }
    searchbox.placeholder=' search by '+ SearchMood;
    searchbox.value='';
    searchbox.focus();
    ShowData();
}
function SearchData(text){
    let table=' ';
    for(let i=0;i<AllProducts.length;i++){
    if(SearchMood=='title'){
        
        
            if(AllProducts[i].title.includes(text.toLowerCase())){
                table +=`
                <tr>
                            <td>${i+1}</td>
                            <td>${AllProducts[i].title}</td>
                            <td>${AllProducts[i].price}</td>
                            <td>${AllProducts[i].tax}</td>
                            <td>${AllProducts[i].ads}</td>
                            <td>${AllProducts[i].discount}</td>
                            <td>${AllProducts[i].total}</td>
                            <td>${AllProducts[i].category}</td>
                            <td><button id="updata" onclick="UpdateData(${i})" >updata</button></td>
                            <td><button id="delete" onclick="DeleteData(${i}) ">delete</button></td>
                        </tr>
                `
       }
    }else{
            if(AllProducts[i].category.includes(text.toLowerCase())){
                table +=`
                <tr>
                            <td>${i+1}</td>
                            <td>${AllProducts[i].title}</td>
                            <td>${AllProducts[i].price}</td>
                            <td>${AllProducts[i].tax}</td>
                            <td>${AllProducts[i].ads}</td>
                            <td>${AllProducts[i].discount}</td>
                            <td>${AllProducts[i].total}</td>
                            <td>${AllProducts[i].category}</td>
                            <td><button id="updata" onclick="UpdateData(${i})" >updata</button></td>
                            <td><button id="delete" onclick="DeleteData(${i}) ">delete</button></td>
                        </tr>
                `
            }
    }
}
    document.getElementById('tbody').innerHTML=table;

}
//check data