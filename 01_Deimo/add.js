const baseUrl = "  http://localhost:3000/card";
const myForm = document.querySelector("#myform");
const textArea = document.querySelector("#textarea");
const cardName = document.querySelector("#cardname");
const priceCard = document.querySelector("#price");
const photoCard = document.querySelector("#photo");
const textTitle = document.querySelector("#text");
const buttonCrd = document.querySelector("#button");
const id = new URLSearchParams(window.location.search).get("id");

if (id) {
  textTitle.innerHTML = "EDIT CARD";
  buttonCrd.innerHTML = "Edit Card";

  axios(`${baseUrl}/${id}`).then((res) => {
    cardName.value = res.data.cardname;
    priceCard.value = res.data.price;
    photoCard.value= res.data.photo;
    textArea.value = res.data.text;
  });
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    photo: `./asserts/image/${photoCard.value.split("\\")[2]}`,
    cardname: cardName.value,
    text: textArea.value,
    price: priceCard.value,
  };

  if(!id){
    axios.post(baseUrl, obj);
  }else{
    axios.put(baseUrl,obj)
  }

  window.location.href = "index.html";
});
