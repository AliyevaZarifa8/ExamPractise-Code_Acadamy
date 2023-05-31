let favorit=document.querySelector("#favorit");
const favUrl="http://localhost:8080/fav ";

 async function drawFav(){
    favorit.innerHTML=""
    let res=await axios(favUrl);
    let data=await res.data;

    data.forEach(element => {
        favorit.innerHTML += `
        <div class="col-4 my-2">
        <div class="card card-text p-2">
          <img src="${element.photo}" alt="img" />
         <p> ${element.firstname},${element.year} yrs.old</p>
          <div class="button">
            <button class="btn btn-danger" onclick=deleteFav("${element.id}")>Delete</button>
          </div>
        </div>
      </div>
        `;
    });
}
drawFav()


async function deleteFav(id){
    await axios.delete(`${favUrl}/${id}`)
}