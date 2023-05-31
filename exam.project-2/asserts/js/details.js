let id = new URLSearchParams(window.location.search).get("id");
let card = document.querySelector(".cards");

async function detailCard() {
  const res = await axios(`http://localhost:3000/card/${id}`);
  const data = await res.data;
  card.innerHTML = `
  <div class="col-1"></div>
  <div class="col col-6 img-text p-2 my-5 bg-danger text-center" id="card">
    <img src="${data.photo}" alt="" width="100px" />
    <h4>${data.title}</h4>
    <div class="parag">
    <p>
    ${data.text}
      </p>
    </div>
    <p id="parag">${data.price}</p>
    <a href="index.html" class="btn btn-success">GO BACK</a>
    
    </div>
    
    `;
}
detailCard();
