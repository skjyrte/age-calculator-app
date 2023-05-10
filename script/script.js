dayjs.extend(preciseDiff);
dayjs.extend(window.dayjs_plugin_customParseFormat);

//const yearInput = document.querySelector(".yearInput");
//const monthInput = document.querySelector(".monthInput");
//const dayInput = document.querySelector(".dayInput");


document.querySelectorAll('input[type="number"]').forEach(input =>{
  input.oninput = () => {
    if(input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
  }
})


const yearResult = document.querySelector(".yearResult");
const monthResult = document.querySelector(".monthResult");
const dayResult = document.querySelector(".dayResult");



document.querySelector(".inputArea").addEventListener("input", setValue);

function setValue(e) {
  birthday[e.target.name] = e.target.value.toString();
}

//birthday object, string values
let birthday = {
  year: "0",
  month: "0",
  day: "0",
};

const currentDate = dayjs();

//VALIDATORS
const required = (lngt) => (val) => {
  if (!val) {
    return "This field is required.";
  }

  if (val.length !== lngt) {
    return "improper date format.";
  }

  return null;
};



//day, month, year validator
const isBetweenRange = (min, max) => (val) => {
  if (val < min) {
    return `Value should be at least ${min}.`;
  }

  if (val > max) {
    return `Value should be at most ${max}.`;
  }

  return null;
};

//birthday date validator
const isValidDate = (val) => {
  if (!val.isValid()) {
    return "Must be a valid date.";
  }

  return null;
};

//birthday date validator
const isBeforeDate = (val) => {
  if (!dayjs(val).isBefore(currentDate)) {
    return "Birthday date must be in the past.";
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
  let birthdayDate = dayjs(
    `${birthday.year}-${birthday.month}-${birthday.day}`,
    "YYYY-MM-DD",
    true
  );

  const yearErrors = validate(birthday.year, yearValidators);
  const monthErrors = validate(birthday.month, monthValidators);
  const dayErrors = validate(birthday.day, dayValidators);

  document.querySelector(".yearInput > .error").textContent = yearErrors[0];
  document.querySelector(".monthInput > .error").textContent = monthErrors[0];
  document.querySelector(".dayInput > .error").textContent = dayErrors[0];

  document.querySelector(".yearResult").innerHTML = "--";
  document.querySelector(".monthResult").innerHTML = "--";
  document.querySelector(".dayResult").innerHTML = "--";

  if (
    yearErrors.length === 0 &&
    monthErrors.length === 0 &&
    dayErrors.length === 0
  ) {
    const dateErrors = validate(birthdayDate, dateValidators);
    document.querySelector(".dayInput > .error").textContent = dateErrors[0];

    if (dateErrors.length === 0) {
      let diff = dayjs.preciseDiff(birthdayDate, currentDate, true);
      document.querySelector(".yearResult").innerHTML = diff.years;
      document.querySelector(".monthResult").innerHTML = diff.months;
      document.querySelector(".dayResult").innerHTML = diff.days;
    }
  }
});
