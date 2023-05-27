const cardaddUrl = "http://localhost:8080/card";
let id = new URLSearchParams(window.location.search).get("id");

let exampleInputTitle = document.querySelector("#exampleInputTitle");
let exampleInputText = document.querySelector("#exampleInputText");
let exampleInputPrice = document.querySelector("#exampleInputPrice");
let exampleInputPhoto = document.querySelector("#exampleInputPhoto");
let submitBtn = document.querySelector("#submit");
let headingHed = document.querySelector("#heading");
let myForm = document.querySelector("#myform");

async function editData() {
  const res = await axios(`${cardaddUrl}/${id}`);
  const obj = res.data;
  submitBtn.innerHTML = "Edit";
  headingHed.innerHTML = "Edit Card";

  exampleInputTitle.value = obj.title;
  exampleInputPrice.value = obj.price;
  exampleInputText.value = obj.text;
}

if (id) {
  editData();
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    photo: `./assets/image/${exampleInputPhoto.value.split("\\")[2]}`,
    title: exampleInputTitle.value,
    price: exampleInputPrice.value,
    text: exampleInputText.value,
  };

  if (id) {
    axios.put(`${cardaddUrl}/${id}`, obj);
    window.location.href = "index.html";
  } else {
    axios.post(cardaddUrl, obj);
  }
});
