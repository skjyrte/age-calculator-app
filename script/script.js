const yearInput = document.querySelector("#year");
const monthInput = document.querySelector("#month");
const dayInput = document.querySelector("#day");


const yearResult = document.querySelector(".resultYear");
const monthResult = document.querySelector(".resultMonth");
const dayResult = document.querySelector(".resultDay");


/*
yearInput.addEventListener("input", calculateValue);

function calculateValue(e) {
  yearResult.textContent = e.target.value;
}
*/


//birthday string values
let year = "1995";
let month = "11"; 
let day = "22";

//current date
const currentDate = new Date();
//birthday date
const birthdayDate = new Date(`${year}-${month}-${day}T00:00:00`)
//time difference in miliseconds

console.log(currentDate - birthdayDate)
const timeDiff = currentDate.getTime() - birthdayDate.getTime()
//number of ms in single day
const oneDay = 24 * 60 * 60 * 1000; 
//number of days
const diffDays = Math.round(Math.abs((timeDiff) / oneDay)); 

currentDate.setDate(currentDate.getDate() - diffDays);

console.log(currentDate);