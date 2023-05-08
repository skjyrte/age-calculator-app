
dayjs.extend(preciseDiff);
dayjs.extend(window.dayjs_plugin_customParseFormat);

const input = document.querySelector(".inputArea");

const yearInput = document.querySelector(".yearInput");
const monthInput = document.querySelector(".monthInput");
const dayInput = document.querySelector(".dayInput");

const yearResult = document.querySelector(".yearResult");
const monthResult = document.querySelector(".monthResult");
const dayResult = document.querySelector(".dayResult");

input.addEventListener("input", setValue);

function setValue(e) {
  birthday[e.target.name] = e.target.value.toString();
}


//birthday string values
let birthday = {
  year: "0",
  month: "0",
  day: "0"
}



const currentDate = dayjs();


//validators


const required = (lngt) => (val) => { //val means input value
  if (!val || val.length !== lngt) {
    return "This field is required";
  }

  return null;
};


const isBetweenRange = (min, max) => (val) => { //val means day, month or year
  if (val < min) {
    return `Value should be at least ${min}.`;
  }

  if (val > max) {
    return `Value should be at most ${max}`;
  }

  return null;
};


const isValidDate = (val) => { //val means birthday date
  if (!val.isValid()) {
    return "Must be a valid date";
  }

  return null;
};


const isBeforeDate = (val) => { //val means birthday date
  if (!dayjs(val).isBefore(currentDate)) {
    return "Birthday date must be in the past";
  }

  return null;
};


const validate = (val, validators) =>
  validators.reduce((errors, currentValidator) => {
    const validationResult = currentValidator(val);
    if (validationResult) {
      return [...errors, validationResult];
    }

    return errors;
  }, []);


const yearValidators = [required(4), isBetweenRange(1900, 2023)];
const monthValidators = [required(2), isBetweenRange(1, 12)];
const dayValidators = [required(2), isBetweenRange(1, 31)];
const dateValidators = [isValidDate, isBeforeDate];


document.querySelector(".image").addEventListener("click", () => {

  let birthdayDate = dayjs(`${birthday.year}-${birthday.month}-${birthday.day}`, 'YYYY-MM-DD', true);

  const yearErrors = (validate(birthday.year, yearValidators));
  const monthErrors = (validate(birthday.month, monthValidators));
  const dayErrors = (validate(birthday.day, dayValidators));

  console.log(yearErrors);
  console.log(monthErrors);
  console.log(dayErrors);

  document.querySelector(".yearInput > .error").textContent = yearErrors[0];
  document.querySelector(".monthInput > .error").textContent = monthErrors[0];
  document.querySelector(".dayInput > .error").textContent = dayErrors[0];

  if (yearErrors.length===0 && monthErrors.length===0 && dayErrors.length===0) {
  const dateErrors = (validate(birthdayDate, dateValidators));
  console.log(dateErrors);
  document.querySelector(".dayInput > .error").textContent = dateErrors[0];
  }

  if (yearErrors.length===0 && monthErrors.length===0 && dayErrors.length===0 && dateErrors.length===0) {
  let diff = dayjs.preciseDiff(birthdayDate, currentDate, true);

  console.log(diff.years)
  console.log(diff.months)
  console.log(diff.days)
  }
  
})




