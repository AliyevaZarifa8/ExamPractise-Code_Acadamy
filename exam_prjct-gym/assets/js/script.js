const cardUrl = "http://localhost:8080/card";
const basketUrl = "http://localhost:8080/basket";
let searchInp = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let crudCard = document.querySelector("#cards");
let showMore = document.querySelector("#showMore");
let menuList = document.querySelector(".menu-list");
let menuIcon = document.querySelector("#menu");
let deleteIcon = document.querySelector("#delete");
let getallData = [];
let filteredData = [];
let sortedData = [];
let evrData = [];
let maxLength = 3;
let sort = "asc";

async function drawCard() {
  let res = await axios(cardUrl);
  let data = await res.data;
  getallData = data;
  crudCard.innerHTML = "";
  filteredData =
    filteredData.length || searchInp.value
      ? filteredData.slice(0, maxLength)
      : getallData.slice(0, maxLength);

  console.log(filteredData);
  filteredData.forEach((element) => {
    crudCard.innerHTML += `
        <div class="col-lg-4  col-md-12">
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
            <a href="details.html?id=${element.id}" class="btn border-danger my-3" id="button"  >View Details</a>
          </div>
          <div id="icon">
            <a href="add-edit.html?id=${element.id}"
              ><i class="fa-regular fa-pen-to-square" id="edit"></i
            ></a>
            <i class="fa-solid fa-trash" id="delete" onclick=deleteCard("${element.id}")></i>
            <i class="fa-solid fa-basket-shopping" id="basket" onclick=addfavCard("${element.id}")></i>
          </div>
        </div>
      </div>
        
        `;
  });
}
drawCard();

async function deleteCard(id) {
  await axios.delete(`${cardUrl}/${id}`);
}
async function addfavCard(id) {
  let res = await axios(`${cardUrl}/${id}`);
  let obj = res.data;
  await axios.post(basketUrl, obj);
}

searchInp.addEventListener("input", function (e) {
  filteredData = getallData.filter((item) => {
    return item.title
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawCard();
  getallData = filteredData;
  evrData = filteredData;
});




showMore.addEventListener("click", function () {
  getallData.length > maxLength + 2
    ? (maxLength += 3)
    : (maxLength = maxLength - (maxLength - getallData.length));
  console.log(filteredData);
  filteredData = getallData.slice(0, maxLength);

  drawCard();
});


sortBtn.addEventListener("click", function () {
  sortedData = filteredData;
  if (sort == "asc") {
    sortBtn.innerHTML = "Sort By Asc";
    sort = "dcs";
    sortedData.sort((a, b) => a.price - b.price);

    drawCard();
  } else if (sort == "dcs") {
    sortBtn.innerHTML = "Sort By Dcs";
    sort = "def";
    sortedData.sort((a, b) => b.price - a.price);

    drawCard();
  } else {
    filteredData = searchInp.value ? evrData : getallData;
    sortBtn.innerHTML = "Sort By";
    sort = "asc";
    drawCard();
  }
});

menuList.style.display = "none";
deleteIcon.style.display = "none";
menuIcon.addEventListener("click", function () {
  menuList.style.display = "block";
  deleteIcon.style.display = "block";
  menuIcon.style.display = "none";
});
deleteIcon.addEventListener("click", function () {
  menuList.style.display = "none";
  deleteIcon.style.display = "none";
  menuIcon.style.display = "block";
});
