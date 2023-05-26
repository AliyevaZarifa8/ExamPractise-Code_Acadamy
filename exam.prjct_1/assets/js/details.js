let detailsCard = document.querySelector(".details");
const cardsUrl = "http://localhost:8080/cards";
let id = new URLSearchParams(window.location.search).get("id");

async function drawDetails() {
  const res = await axios(`${cardsUrl}/${id}`);
  const data = res.data;
  detailsCard.innerHTML = `
    <div class="col-8 offset-2 crud-card card">
    <img src="${data.photo}" alt="" />
    <h2>${data.cards_name}"</h2>
    <span>Price : ${data.price}"</span>
    <div class="crud-text">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
        eligendi perferendis dicta rem dolorum distinctio quo quos,
        explicabo voluptatem iusto dolorem enim repudiandae.
      </p>
    </div>
  </div>
    
    `;
}
drawDetails();
