"use strict";
//dayJS plugins
dayjs.extend(preciseDiff);
dayjs.extend(window.dayjs_plugin_customParseFormat);
//limit the character count for input type "number"

document.querySelectorAll('input').forEach((input) => {
  input.oninput = () => {
    console.log(input.value)
    if (input.value == "") {
      input.value = "";
    }
    if (input.value.length > input.maxLength)
      input.value = input.value.slice(0, input.maxLength);
  };
});

//fill the birthday object with input values
document.querySelector(".inputArea").addEventListener("input", setValue);
function setValue(e) {
  birthday[e.target.name] = e.target.valueAsNumber; //value is passed a string, asNumber was required
  e.target.parentNode.classList.remove("errorStyles");
  //reset the previous date
  document.querySelector(".yearResult").innerHTML = "--";
  document.querySelector(".monthResult").innerHTML = "--";
  document.querySelector(".dayResult").innerHTML = "--";
  //clear the error field on input
  document.querySelector(`.${e.target.name}Input > .error`).textContent = "";
  if (dateErorrsMarker !== 0) {
    document.querySelector(".dayInput").classList.remove("errorStyles");
    document.querySelector(".monthInput").classList.remove("errorStyles");
    document.querySelector(".yearInput").classList.remove("errorStyles");
  }
}

//passing function scoped variable to global scoped event listener
let dateErorrsMarker;
//initial current date
let currentDate = dayjs();

//birthday object, property value type "number"
let birthday = {
  year: 0,
  month: 0,
  day: 0,
};

/******VALIDATORS******/

//1) if value is present validator
const required = (val) => {
  if (!val) {
    return "This field is required.";
  }
};

//2) input correcting validator
const characterValidator = (lngth, selector, val) => {
  let valStr = val.toString();
  while (valStr.length < lngth) {
    valStr = "0" + valStr;
    document.querySelector(`#${selector}`).value = valStr;
  }
  return valStr;
};

//3) day, month, year validator
const isBetweenRange = (min, max) => (val) => {
  if (val < min) {
    return `Value should be at least ${min}.`;
  }

  if (val > max) {
    return `Value should be at most ${max}.`;
  }

  return null;
};

//4) birthday date validator according to calendar
const isValidDate = (val) => {
  if (!val.isValid()) {
    return "Must be a valid date.";
  }

  return null;
};

//5) birthday must be in the past validator
const isBeforeDate = (val) => {
  if (!dayjs(val).isBefore(currentDate)) {
    return "Birthday date must be in the past.";
  }

  return null;
};

//gather the error values into arrays
const validate = (val, validators) =>
  validators.reduce((errors, currentValidator) => {
    const validationResult = currentValidator(val);
    if (validationResult) {
      return [...errors, validationResult];
    }

    return errors;
  }, []);

const yearValidators = [required, isBetweenRange(1900, 2023)];
const monthValidators = [required, isBetweenRange(1, 12)];
const dayValidators = [required, isBetweenRange(1, 31)];

//function needed to paint relevant boxes red according to appropriate error type
function colorError(val, obj) {
  if (obj.length > 0) {
    val.forEach((element) =>
      document.querySelector(`.${element}Input`).classList.add("errorStyles")
    );
  }
}

//events for button color change during hoover action
document.querySelector(".image>button").addEventListener("mouseover", (e) => {
  e.currentTarget.classList.add("mouseoverClass");
}); //use of currentTarget was necessary

document.querySelector(".image>button").addEventListener("mouseout", (e) => {
  e.currentTarget.classList.remove("mouseoverClass");
}); //use of currentTarget was necessary

/******VALIDATION BUTTON******/

document.querySelector(".image>button").addEventListener("click", () => {
  // fix input value characters function e.g. input 1 -> 01
  characterValidator(2, "day", birthday.day); //days
  characterValidator(2, "month", birthday.month); //months
  characterValidator(4, "year", birthday.year); //years
  //input numbers validators
  const yearErrors = validate(birthday.year, yearValidators);
  const monthErrors = validate(birthday.month, monthValidators);
  const dayErrors = validate(birthday.day, dayValidators);
  //display only single error note
  document.querySelector(".yearInput > .error").textContent = yearErrors[0];
  document.querySelector(".monthInput > .error").textContent = monthErrors[0];
  document.querySelector(".dayInput > .error").textContent = dayErrors[0];
  //painting red the incorrect fields
  colorError(["day"], dayErrors);
  colorError(["month"], monthErrors);
  colorError(["year"], yearErrors);

  //current date need to be updated after every calculation request
  currentDate = dayjs();
  //clearing previous value
  dateErorrsMarker = 0;

  //if numbers are ok validate whole date
  if (
    yearErrors.length === 0 &&
    monthErrors.length === 0 &&
    dayErrors.length === 0
  ) {
    let birthdayDate = dayjs(
      `${birthday.year}-${birthday.month}-${birthday.day}`,
      "YYYY-M-D",
      true
    );
    const dateValidators = [isValidDate, isBeforeDate];
    const dateErrors = validate(birthdayDate, dateValidators);
    document.querySelector(".dayInput > .error").textContent = dateErrors[0];

    //passing date validation error to the outside scope
    dateErorrsMarker = dateErrors.length;
    //painting red incorrect fields
    colorError(["day", "month", "year"], dateErrors);
    //if whole date is valid then calculate the result
    if (dateErrors.length === 0) {
      //time difference calculation
      let diff = dayjs.preciseDiff(birthdayDate, currentDate, true);
      document.querySelector(".yearResult").innerHTML = diff.years;
      document.querySelector(".monthResult").innerHTML = diff.months;
      document.querySelector(".dayResult").innerHTML = diff.days;
    }
  }
});
