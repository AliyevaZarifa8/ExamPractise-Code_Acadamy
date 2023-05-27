const cardUrl = "http://localhost:8080/cards";
const basketUrl = "http://localhost:8080/basket";
let searchInp = document.querySelector("#searchinp");
let sortBtn = document.querySelector("#sortbtn");
let crudCards = document.querySelector(".crud-cards");
let showMore = document.querySelector("#showMore");
let getallData = [];
let filteredData = [];
let sortedData = [];
let maxLength = 3;
let sort = "asc";


async function drawCard() {
  const res = await axios(cardUrl);
  const data = await res.data;
  getallData = data;
  console.log(maxLength);
  crudCards.innerHTML = "";
  filteredData =
    filteredData.length || searchInp.value
      ? filteredData.slice(0, maxLength)
      : getallData.slice(0, maxLength);
  filteredData.forEach((element) => {
    crudCards.innerHTML += `
    <div class="col-4 crud-card card">
    <img src="${element.photo}" alt="" />
    <h2>${element.cards_name}</h2>
    <span>Price : ${element.price}</span>
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
    <div id="icon">
      <a href="add-edit.html?id=${element.id}">
        <i class="fa-regular fa-pen-to-square" id="edit"></i
      ></a>
      <i class="fa-solid fa-trash" id="delete" onclick=deleteCard("${element.id}")></i>
      <i class="fa-solid fa-basket-shopping" id="basket" onclick=addBasket("${element.id}")></i>
    </div>
  </div>
    `;
  });
}
drawCard();

async function deleteCard(id) {
  await axios.delete(`${cardUrl}/${id}`);
}

searchInp.addEventListener("input", function (e) {
  filteredData = getallData.filter((item) => {
    return item.cards_name
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  everyfilterData = filteredData;
  drawCard();
});

sortBtn.addEventListener("click", function () {
  sortedData = filteredData;
  if (sort == "asc") {
    sortedData.sort((a, b) => a.price - b.price);
    sortBtn.innerHTML = "Sort by Asc";
    sort = "dsc";
    drawCard();
  } else if (sort == "dsc") {
    sortedData.sort((a, b) => b.price - a.price);
    sortBtn.innerHTML = "Sort by Dsc";
    sort = "default";
    drawCard();
  } else {
    filteredData = everyfilterData;
    sortBtn.innerHTML = "Sort by";
    sort = "asc";
    drawCard();
  }
});

async function addBasket(id) {
  let res = await axios(`${cardUrl}/${id}`);
  let obj = res.data;
  await axios.post(basketUrl, obj);
}


showMore.addEventListener("click", function () {
  maxLength+=3;
  filteredData=getallData.slice(0,maxLength)
  drawCard();
});
