const cardsUrl = "http://localhost:3000/card";
const myForm = document.querySelector("#myform");
const titleCard = document.querySelector("#title");
const priceCard = document.querySelector("#price");
const photoCard = document.querySelector("#photo");
const textsTitle = document.querySelector("#texts");
const textTitle = document.querySelector("#text");
const buttonCrd = document.querySelector("#button");
const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

async function getUserByID() {
  textTitle.innerHTML = "EDIT CARD";
  buttonCrd.innerHTML = "Edit Card";
  const res = await axios(`${cardsUrl}/${id}`);
  const obj = await res.data;
  console.log(obj);
  titleCard.value = obj.title;
  priceCard.value = obj.price;
  textsTitle.value = obj.text;
}

if (id) {
  getUserByID();
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    photo: `./assets/image/${photoCard.value.split("\\")[2]}`,
    price: priceCard.value,
    text: textsTitle.value,
    title: titleCard.value,
  };

  if (!id) {
    axios.post(cardsUrl, obj);
    window.location.href = "index.html";
  } else {
    axios.put(`${cardsUrl}/${id}`, obj);
    window.location.href = "index.html";
  }
});
