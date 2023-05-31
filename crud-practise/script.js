const BasaUrl = " http://localhost:8080/students";

let tBody = document.querySelector("tbody");

async function drawTable() {
  let res = await axios(BasaUrl);
  let data = await res.data;
  data.forEach((element) => {
    tBody.innerHTML += `
   <tr>
   <td>${element.firstName}</td>
   <td>${element.surName}</td>
   <td>${element.email}</td>
   <td>${element.cardnum}</td>
   <td>
   <a class="btn btn-success" >Edit</a>
   <button class="btn btn-danger"  onclick=allDeleteObj('${element.id}')>Delete</button>
   <a class="btn btn-primary"   onclick=allDetailsObj('${element.id}')>Details</a>
   </td>
   </tr>
   
   `;
  });
}
drawTable();

async function allDeleteObj(id) {
  await axios.delete(`${BasaUrl}/${id}`);
}

let myForm = document.querySelector("#userForm");
let addInputFirstName = document.querySelector("#firstName");
let addInputLastName = (e = document.querySelector("#lastName"));
let addInputEmail = document.querySelector("#email");
let cardNum = document.querySelector("#card");
let submitBtn = document.querySelector("#submit");




async function CreatedUser() {
  const obj = {
    firstName: addInputFirstName.value,
    surName: addInputLastName.value,
    email: addInputEmail.value,
    cardnum: cardNum.value,
  };
  await axios.post(BasaUrl, obj);
}

async function  editFun(){

    let res=await axios(`${BasaUrl}/${id}`)
    let data= await res.data

    addInputFirstName.value=data.firstName
    addInputLastName.value=data.surName
    addInputEmail.value=data.email
    cardNum.value=data.cardnum
    submitBtn.innerHTML="Edit"
    editStatus=true
}



myForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if(!editStatus){
    CreatedUser();
    }else{




        }
});



