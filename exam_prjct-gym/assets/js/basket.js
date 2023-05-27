
let basketCard=document.querySelector(".basket");
const basketsUrl = "http://localhost:8080/basket";



async function drawBasket(){
    basketCard.innerHTML=""
    let res = await axios(basketsUrl);
    let data = await res.data;
     data.forEach(element => {
        basketCard.innerHTML+=`
        <div class="col-4">
        <div class="card dinamc-card">
          <img src="${element.photo}" alt="" />
          <h3>${element.title}</h3>
          <span>Price: ${element.price}</span>
          <div class="dinamc-parag">
            <p>
            ${element.text}
            </p>
          </div>
          <div>
            <button class="btn border-danger my-3">View Details</button>
          </div>
          <div id="icon">
            <i class="fa-solid fa-trash" id="delete" onclick=deleteBasket("${element.id}")></i>
          </div>
        </div>
      </div>
        
        `
     });
}
drawBasket()
async function deleteBasket(id){
    await axios.delete(`${basketsUrl}/${id}`)
}
