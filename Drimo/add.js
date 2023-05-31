let cardName = document.querySelector("#lname");
let textArea = document.querySelector("#textarea");
let imageCard = document.querySelector("#image");
let praceCard = document.querySelector("#prace");
let myForm = document.querySelector("#myform");

const baseUrl = "http://localhost:8080/card";

myForm.addEventListener("submit", async function addCard(e) {
  e.preventDefault();
  let obj = {
    photo: `./assects/Image/${imageCard.value.split("\\")[2]}`,
    name: cardName.value,
    text: textArea.value,
    price: praceCard.value,
  };

  await axios.post(baseUrl, obj);
  window.location.href="index.html"
});
