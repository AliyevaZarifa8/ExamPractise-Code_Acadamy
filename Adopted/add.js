const baseeUrl = "http://localhost:8080/child";
const myForm = document.querySelector("#myform");
const childName = document.querySelector("#childname");
const yearCard = document.querySelector("#year");
const photoCard = document.querySelector("#photo");
const textTitle = document.querySelector("#text");
const buttonCrd = document.querySelector("#button");
const id = new URLSearchParams(window.location.search).get("id");

if (id) {
  textTitle.innerHTML = "EDIT CARD";
  buttonCrd.innerHTML = "Edit Card";
  console.log(id);
  console.log(photoCard.value);
  axios(`${baseeUrl}/${id}`).then((res) => {
    console.log(res.data);
    childName.value = res.data.firstname;
    yearCard.value = res.data.year;
  });
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    photo: `./asserts/image/${photoCard.value.split("\\")[2]}`,
    firstname: childName.value,
    year: yearCard.value,
  };

  if (!id) {
    axios.post(baseeUrl, obj);
  } else {
    axios.put(`${baseeUrl}/${id}`, obj);
  }

  window.location.href = "index.html";
});
