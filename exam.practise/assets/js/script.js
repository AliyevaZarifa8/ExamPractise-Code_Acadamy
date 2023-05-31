const cardUrl = "http://localhost:3000/card";
const basketUrl = "http://localhost:3000/basket";
let card = document.querySelector("#cards");
const searchInp = document.querySelector("#search");
const sortBtn = document.querySelector("#sort");
let sortedData = [];
let filteredData = [];
let sorted = "asc";

async function drawCard() {
  const res = await axios(cardUrl);
  const data = await res.data;
  sortedData = data;
  card.innerHTML = "";
  filteredData = filteredData.length || searchInp.value ? filteredData : data;
  filteredData.forEach((element) => {
    card.innerHTML += `
      <div class="col col-3 img-text p-2" id="card">
      <img src="${element.photo}" alt="" width="100px" />
      <h4>${element.title}</h4>
      <div class="parag">
        <p>
       ${element.text}
        </p>
      </div>
      <p id="parag">${element.price}</p>
      <a href="details.html?id=${element.id}" id="more-details" class="mb-4">More Details</a>
      <div class="button">
        <button class="btn btn-danger" onclick=deleteCard("${element.id}")>Delete</button>
        <a href="add-edit.html?id=${element.id}" class="btn btn-success">Edit</a>
        <button class="btn btn-primary" onclick=addFav("${element.id}")>Add Basket</button>
      </div>
    </div>
          `;
  });
}
drawCard();

async function deleteCard(id) {
  await axios.delete(`${cardUrl}/${id}`);
}

async function addFav(id) {
  const res = await axios(`${cardUrl}/${id}`);
  const obj = res.data;
  await axios.post(basketUrl, obj);
}

searchInp.addEventListener("input", async function (e) {
  const res = await axios(cardUrl);
  const data = await res.data;
  filteredData = data.filter((item) => {
    return item.title
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawCard(filteredData);
});

sortBtn.addEventListener("click", async function () {
  const res = await axios(cardUrl);
  const data = await res.data;
  if (sorted == "asc") {
    sortBtn.innerHTML = "Sort by Asc";
    filteredData.sort((a, b) => a.price - b.price);
    drawCard();
    sorted = "dsc";
  } else if (sorted == "dsc") {
    sortBtn.innerHTML = "Sort by Dsc";
    filteredData.sort((a, b) => b.price - a.price);
    drawCard();
    sorted = "default";
  } else {
    sortBtn.innerHTML = "Sort by";
    sorted = "asc";
    filteredData = sortedData;
    console.log("else");
    console.log(sortedData);
  }
});
