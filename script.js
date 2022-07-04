text=document.querySelector("#text")
plus=document.querySelector(".plus")
todolist=document.querySelector(".addedtask")
showtask();
window.onload=()=>{
text.focus()
}
text.onkeyup=()=>{
    let userdata=text.value;
    if(userdata.trim()!=0){
        plus.classList.add("active");
    }
    else{
        plus.classList.remove("active")
    }
}
plus.onclick=()=>{
    let userdata=text.value;
    let getLocalStorage=localStorage.getItem("New Todo");
    if(getLocalStorage==null){
        listarr=[];
    }
    else{
        listarr=JSON.parse(getLocalStorage);
    }
    listarr.push(userdata);
    localStorage.setItem("New Todo",JSON.stringify(listarr));
    showtask()
    text.value=""
    text.onkeyup()
    text.focus()
}
function showtask(){
    let getLocalStorage=localStorage.getItem("New Todo");
    if(getLocalStorage==null){
        listarr=[];
    }
    else{
        listarr=JSON.parse(getLocalStorage);
    }
    let newtag='';
    listarr.forEach((element,index) => {
        newtag+=`<div class="adt"><div class="task">${element}</div><div><button class="btn" onclick="del(${index})">delete</button></div></div>`;
    });
    todolist.innerHTML=newtag;
    document.querySelector(".pending").innerHTML=`You have ${listarr.length} pending items`;
}

function cler(){
    localStorage.clear();
    todolist.innerHTML=""
    document.querySelector(".pending").innerHTML=`You have 0 pending items`;
    text.value=``;
    text.focus();
    
}
function del(index){
    let getLocalStorage=localStorage.getItem("New Todo");
    listarr=JSON.parse(getLocalStorage);
    listarr.splice(index,1);
    localStorage.setItem("New Todo",JSON.stringify(listarr));
    showtask();
    text.focus();
}