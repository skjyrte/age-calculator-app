
dayjs.extend(preciseDiff);
dayjs.extend(window.dayjs_plugin_customParseFormat);

const input = document.querySelector(".inputArea");

const yearResult = document.querySelector(".resultYear");
const monthResult = document.querySelector(".resultMonth");
const dayResult = document.querySelector(".resultDay");

input.addEventListener("input", setValue);

function setValue(e) {
  birthday[e.target.name] = e.target.value;
  validationFunc();
}

//birthday string values
let birthday = {
  year: 2000,
  month: 1,
  day: 1
}

function validationFunc() { 

  //---year
if (birthday.year.length ===! 4 ){
}//this field is required
if (birthday.year < 1900){
}//year must be over 1900
if (birthday.year > 2023){
}//must be in past

//---month
if (birthday.month.length ===! 2 ){
}//this field is required
if (birthday.month < 1 || birthday.month > 12){
}//must be a valid month

//---day
if (birthday.day.length ===! 2 ){
}//this field is required
if (birthday.day < 1 || birthday.day > 31){
}//must be a valid day

//---date validity
if (!dayjs(`${birthday.year}-${birthday.month}-${birthday.day}`, 'YYYY-MM-DD', true).isValid()){
}//Must be a valid date
}


/*

const birthdayDate = new Date(`${birthday.year}-${birthday.month}-${birthday.day}T00:00:00`)

let m1 = dayjs(birthdayDate);
let m2 = dayjs(); //current date
let diff = dayjs.preciseDiff(m1, m2, true);

console.log(diff.years)
console.log(diff.months)
console.log(diff.days)

*/