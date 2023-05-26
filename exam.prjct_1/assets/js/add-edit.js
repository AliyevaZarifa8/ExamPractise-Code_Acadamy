const cardUrll = "http://localhost:8080/cards";
let myForm = document.querySelector("#myForm");
let exampleInputName = document.querySelector("#exampleInputName");
let exampleInputPrice = document.querySelector("#exampleInputPrice");
let exampleInputPhoto = document.querySelector("#exampleInputPhoto");
let id = new URLSearchParams(window.location.search).get("id");

async function editData() {
  const res = await axios(`${cardUrll}/${id}`);
  const data = await res.data;
  exampleInputName.value = data.cards_name;
  exampleInputPrice.value = data.price;
}

if (id) {
  editData();
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    cards_name: exampleInputName.value,
    price: exampleInputPrice.value,
    photo: `./assets/image/${exampleInputPhoto.value.split("\\")[2]}`,
  };

  if (!id) {
    axios.post(cardUrll, obj);
  } else {
    axios.put(`${cardUrll}/${id}`, obj);
    window.location.href = "index.html";
  }
  
});
