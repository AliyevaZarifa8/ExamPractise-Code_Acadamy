const baseUrl = "  http://localhost:3000/card";
const imgCard = document.querySelector(".img-card");
const searchInp = document.querySelector("#search");
let newArr = [];

function drawCard(array) {
  imgCard.innerHTML = "";
  array.filter((element) => {
    imgCard.innerHTML += `
        <div class="col-4 my-2">
        <div class="card card-text">
          <img src="${element.photo}" alt="img" />
          <h2>${element.cardname}</h2>
          <div class="parags">
            <p>
             ${element.text}
            </p>
          </div>
          <p>Price : ${element.price}</p>
          <div class="button">
            <button class="btn btn-danger" onclick=deleteCard("${element.id}")>Delete</button>
            <a href="./add.html?id=${element.id}" class="btn btn-success" >Edit</a>
            <button class="btn btn-primary">Add Fav</button>
          </div>
        </div>
      </div>
        `;
  });
}

console.log(7);

async function cardDraw() {
  console.log(8);
  const res = await axios(baseUrl);
  const data = await res.data;
  newArr = data;
  
  drawCard(data);
  console.log(drawCard(data));
}
cardDraw();

async function deleteCard(id) {
  await axios.delete(`${baseUrl}/${id}`);
}

searchInp.addEventListener("input", function () {
  
});
