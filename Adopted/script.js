const baseUrl = " http://localhost:8080/child";
const imgCard = document.querySelector(".img-card");
const searchInp = document.querySelector("#search");
const sortBtn = document.querySelector("#sort");
let filteredData = [];
let sortedData = [];
let sorted = "asc";
async function drawCard() {
  const res = await axios(baseUrl);
  const data = await res.data;
  sortedData = data;
  imgCard.innerHTML = "";
  filteredData = (filteredData.length || searchInp.value) ? filteredData : data;
  filteredData.filter((element) => {
    imgCard.innerHTML += `
        <div class="col-4 my-2">
        <div class="card card-text p-2">
          <img src="${element.photo}" alt="img" />
         <p> ${element.firstname},${element.year} yrs.old</p>
          <div class="button">
            <button class="btn btn-danger" onclick=deleteCard("${element.id}")>Delete</button>
            <a href="./add.html?id=${element.id}" class="btn btn-success" >Edit</a>
            <button class="btn btn-primary" onclick=addFav(${element.id})>Add Fav</button>
          </div>
        </div>
      </div>
        `;
  });
}
drawCard();

async function deleteCard(id) {
  await axios.delete(`${baseUrl}/${id}`);
}

searchInp.addEventListener("input", async function (e) {
  const res = await axios(baseUrl);
  const data = await res.data;
  filteredData = data.filter((item) => {
    return item.firstname
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawCard(filteredData);
});

sortBtn.addEventListener("click", async function () {
  const res = await axios(baseUrl);
  const data = await res.data;
  if (sorted == "asc") {
    sortBtn.innerHTML = "Sort by Asc";
    sortedData = data.sort((a, b) => a.year - b.year);
    filteredData = sortedData;
    drawCard(sortedData);
    sorted = "dsc";
  } else if (sorted == "dsc") {
    sortBtn.innerHTML = "Sort by Dsc";
    filteredData = data.sort((a, b) => b.year - a.year);
    filteredData = sortedData;
    drawCard(sortedData);
    sorted = "default";
  } else {
    sortBtn.innerHTML = "Sort by";
    sorted = "asc";
    cardDraw();
  }
});

async function addFav(id) {
  let res = await axios(` ${baseUrl}/${id}`);
  const obj = await res.data;
  axios.post("http://localhost:8080/fav", obj);
}
