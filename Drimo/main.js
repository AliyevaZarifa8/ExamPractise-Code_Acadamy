const baseUrl = "http://localhost:8080/card";
const profCard = document.querySelector(".prof-card");
const searchInp = document.querySelector(".searchinp");

function drawCard(array) {
  profCard.innerHTML = "";
  array.filter((element) => {
    profCard.innerHTML += `
        
        <div class="col-4">
            <div class="card">
             <div>
             <img src="${element.photo}" alt="" width="380px" />
             </div>
              <h3>${element.name}</h3>
              <p>
               ${element.text}
              </p>
              <p>${element.price}</p>
              <div class="button">
                <button class="btn bg-danger" onclick=deleteCard("${element.id}")>Delete</button>
                <a href="" class="btn bg-success">Edit</a>
              </div>
            </div>
          </div>

        
        `;
  });
}

async function drawCards() {
  let res = await axios(baseUrl);
  const data = await res.data;
  console.log(data);
  drawCard(data);
}
drawCards();

async function deleteCard(id) {
  await axios.delete(`${baseUrl}/${id}`);
}

searchInp.addEventListener("input", async function (e) {
  let res = await axios(baseUrl);
  const data = await res.data;
  filterData = data.filter((item) => {
    return item.name
      .toLocalLowerCase()
      .includes(e.target.value.toLocalLowerCase());
  });

  drawCard(filterData);
});
