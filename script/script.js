"use strict";

dayjs.extend(preciseDiff);
dayjs.extend(window.dayjs_plugin_customParseFormat);

document.querySelectorAll("input").forEach((input) => {
  input.oninput = () => {
    console.log(input.value);
    if (input.value == "") {
      //firefox input type "number" bug fix
      input.value = ""; //firefox input type "number" bug fix
    }
    if (input.value.length > input.maxLength)
      input.value = input.value.slice(0, input.maxLength);
  };
});

document.querySelector(".inputArea").addEventListener("input", setValue);
function setValue(e) {
  birthday[e.target.name] = e.target.valueAsNumber;
  e.target.parentNode.classList.remove("errorStyles");

  document.querySelector(".yearResult").innerHTML = "--";
  document.querySelector(".monthResult").innerHTML = "--";
  document.querySelector(".dayResult").innerHTML = "--";

  document.querySelector(`.${e.target.name}Input > .error`).textContent = "";
  if (dateErorrsMarker !== 0) {
    document.querySelector(".dayInput").classList.remove("errorStyles");
    document.querySelector(".monthInput").classList.remove("errorStyles");
    document.querySelector(".yearInput").classList.remove("errorStyles");
  }
}

let dateErorrsMarker;

let currentDate = dayjs();

let birthday = {
  year: 0,
  month: 0,
  day: 0,
};

/******VALIDATORS******/

const required = (val) => {
  if (!val) {
    return "This field is required.";
  }
};

const characterValidator = (lngth, selector, val) => {
  let valStr = val.toString();
  while (valStr.length < lngth) {
    valStr = "0" + valStr;
    document.querySelector(`#${selector}`).value = valStr;
  }
  return valStr;
};

const isBetweenRange = (min, max) => (val) => {
  if (val < min) {
    return `Value should be at least ${min}.`;
  }

  if (val > max) {
    return `Value should be at most ${max}.`;
  }

  return null;
};

const isValidDate = (val) => {
  if (!val.isValid()) {
    return "Must be a valid date.";
  }

  return null;
};

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

const yearValidators = [required, isBetweenRange(1900, 2023)];
const monthValidators = [required, isBetweenRange(1, 12)];
const dayValidators = [required, isBetweenRange(1, 31)];

function colorError(val, obj) {
  if (obj.length > 0) {
    val.forEach((element) =>
      document.querySelector(`.${element}Input`).classList.add("errorStyles")
    );
  }
}

document.querySelector(".image>button").addEventListener("mouseover", (e) => {
  e.currentTarget.classList.add("mouseoverClass");
});

document.querySelector(".image>button").addEventListener("mouseout", (e) => {
  e.currentTarget.classList.remove("mouseoverClass");
});

/******VALIDATION BUTTON******/

document.querySelector(".image>button").addEventListener("click", () => {
  characterValidator(2, "day", birthday.day);
  characterValidator(2, "month", birthday.month);
  characterValidator(4, "year", birthday.year);

  const yearErrors = validate(birthday.year, yearValidators);
  const monthErrors = validate(birthday.month, monthValidators);
  const dayErrors = validate(birthday.day, dayValidators);

  document.querySelector(".yearInput > .error").textContent = yearErrors[0];
  document.querySelector(".monthInput > .error").textContent = monthErrors[0];
  document.querySelector(".dayInput > .error").textContent = dayErrors[0];

  colorError(["day"], dayErrors);
  colorError(["month"], monthErrors);
  colorError(["year"], yearErrors);

  currentDate = dayjs();

  dateErorrsMarker = 0;

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

    dateErorrsMarker = dateErrors.length;

    colorError(["day", "month", "year"], dateErrors);

    if (dateErrors.length === 0) {
      let diff = dayjs.preciseDiff(birthdayDate, currentDate, true);
      document.querySelector(".yearResult").innerHTML = diff.years;
      document.querySelector(".monthResult").innerHTML = diff.months;
      document.querySelector(".dayResult").innerHTML = diff.days;
    }
  }
});
