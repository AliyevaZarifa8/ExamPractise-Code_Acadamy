let btnDis = document.querySelector("#btn");
let navDis = document.querySelector("#navbar");

function scrollFunc() {
  let x =
    document.body.scrollTop > 900 || document.documentElement.scrollTop > 900;
  if (x) {
    navDis.style.background = "grey";
    btnDis.style.display = "block";
  } else {
    navDis.style.background = "";
    btnDis.style.display = "none";
  }
}
window.addEventListener("scroll", function () {
  scrollFunc();
});

btnDis.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 100;
});
