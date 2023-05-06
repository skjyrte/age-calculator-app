const yearInput = document.querySelector("#year");
const monthInput = document.querySelector("#month");
const dayInput = document.querySelector("#day");


const yearResult = document.querySelector(".resultYear");
const monthResult = document.querySelector(".resultMonth");
const dayResult = document.querySelector(".resultDay");



//yearInput.addEventListener("input", updateValue);

function updateValue(e) {
  yearResult.textContent = e.target.value;
}


