function saveTolocalStorage(event)
{
    event.preventDefault();
    const amount=event.target.amount.value;
    const descript=event.target.descript.value;
    const category=event.target.category.value;
    let obj={
        amount:amount,
        descript:descript,
        category:category   
              };
    
  //  localStorage.setItem("Expense Amount",amount);
   // localStorage.setItem("Description",decript);
   // localStorage.setItem("Category",category);
  // const obj={amount,descript,category}
   //localStorage.setItem(obj,JSON.stringify(obj));
   //showNewUserOnScreen(obj);
   axios.post("https://crudcrud.com/api/2695a190a92546a89f02485c85f86e06/expensedata",obj)
.then((res)=>{
    showNewUserOnScreen(res.data);
    //console.log(responce)
})
.catch((error)=>{
    console.log(error)
})

}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/2695a190a92546a89f02485c85f86e06/expensedata")
    .then((res)=>{
        console.log(res);
        for(let i=0;i<res.data.length;i++)
        {
             showNewUserOnScreen(res.data[i]);
        }

    }).catch((err)=>{
        console.log(err);
    })
  
})
function showNewUserOnScreen(user)
{
    document.getElementById("amount").value='';
    document.getElementById("descript").value='';
    document.getElementById("category").value='';

    if(localStorage.getItem(user.amount,user.descript,user.category)!==null)
    {
        removeUserFromScreen(amount,descript,category);
    }
    const parentNode = document.getElementById('listOfUsers');
                const childHTML = `<li id=${user._id}>${user.amount}- ${user.descript}-${user.category}
                <button onclick=deleteUser('${user._id}')><i class="fa fa-trash"></i>  </button>                  
                <button onclick=editUser('${user.amount}','${user.descript}','${user.category}','${user._id}')><i class="fa fa-edit"></i></button>
                                        </li>`
parentNode.innerHTML=parentNode.innerHTML+childHTML;
}
function deleteUser(userId){
   // localStorage.removeItem(amount,descript,category);
    //removeUserFromScreen(amount,descript,category);
    axios.delete(`https://crudcrud.com/api/2695a190a92546a89f02485c85f86e06/expensedata/${userId}`)
    .then((res)=>
    {
        removeUserFromScreen(userId);
    })
    .catch((err)=>{
        console.log(err);
    })

}

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    //const childNodeToBeDeleted = document.getElementById(amount);
    //const childNodeToBeDeleted2 = document.getElementById(descript);

    //const childNodeToBeDeleted3 = document.getElementById(category);
    const childNodeToBeDeleted = document.getElementById(userId);


if(childNodeToBeDeleted){
    parentNode.removeChild(childNodeToBeDeleted)
}
}
function editUser(amount,descript,category,userId)
{
    document.getElementById("amount").value=amount;
    document.getElementById("descript").value=descript;
    document.getElementById("category").value=category;
  deleteUser(userId);

}