let detailsCard = document.querySelector(".details");
const cardsUrl = "http://localhost:8080/card";
let id = new URLSearchParams(window.location.search).get("id");

async function drawDetails() {
  let res = await axios(`${cardsUrl}/${id}`);
  let data = res.data;

  detailsCard.innerHTML = `
    <div class="col-6">
    <div class="card dinamc-card">
      <img src="${data.photo}" alt="" />
      <h3>${data.title}</h3>
      <span>Price: ${data.price}</span>
      <div class="dinamc-parag">
        <p>
        ${data.text}
        </p>
      </div>
    </div>
  </div>
    `;
}
drawDetails();
