let basketCard = document.querySelector(".basket");
const basketsUrl = "http://localhost:8080/basket";

async function drawBasket() {
  const res = await axios(basketsUrl);
  const data = await res.data;
  basketCard.innerHTML = "";
  data.forEach((element) => {
    basketCard.innerHTML += `
      <div class="col-4 crud-card card">
      <img src="${element.photo}" alt="" />
      <h2>${element.cards_name}"</h2>
      <span>Price : ${element.price}"</span>
      <div class="crud-text">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
          eligendi perferendis dicta rem dolorum distinctio quo quos,
          explicabo voluptatem iusto dolorem enim repudiandae.
        </p>
      </div>
      <div>
        <a href="details.html?id=${element.id}" id="a-tag">View Details</a>
      </div>
      <i class="fa-solid fa-trash" id="delete" onclick=deleteBasket("${element.id}")></i>
    </div>
      `;
  });
}
drawBasket();



async function deleteBasket(id){
    await axios.delete(`${basketsUrl}/${id}`)
}
