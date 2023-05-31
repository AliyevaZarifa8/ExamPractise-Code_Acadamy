let favorit=document.querySelector("#favorit");
const basketsUrl="http://localhost:3000/basket";

 async function drawFav(){
    favorit.innerHTML=""
    let res=await axios(basketsUrl);
    let data=await res.data;

    data.forEach(element => {
        favorit.innerHTML += `
        <div class="col col-3 img-text p-2" id="card">
        <img src="${element.photo}" alt="" width="100px" />
        <h4>${element.title}</h4>
        <div class="parag">
          <p>
         ${element.text}
          </p>
        </div>
        <p id="parag">${element.price}</p>
        <button id="more-details" class="mb-4">More Details</button>
        <div class="button">
          <button class="btn btn-danger" onclick=deleteBasket("${element.id}")>Delete</button>
        </div>
      </div>
        `;
    });
}
drawFav()


async function deleteBasket(id){
    await axios.delete(`${basketsUrl}/${id}`)
}