import './style.css'
import { createMarkup } from './utils'

// Create a container html element to wire everything together
const root = createMarkup("div", document.body, { id: "root" }) as HTMLDivElement;

// Create the currency converter form
const currencyConverterForm = createMarkup("form", root, { "class": "box" }) as HTMLFormElement;

// Create a span element to display validation errors
const error = createMarkup("span", currencyConverterForm, { "class": "has-text-danger mb-3", "id": "error" }, "Please enter a valid currency amount") as HTMLSpanElement;

// Create h1 heading element
createMarkup("h1", currencyConverterForm, { "class": "has-text-centered is-size-4 mb-4" }, "Currency Converter");

// Create euro currency input field
const euroInput = createMarkup("input", currencyConverterForm, {
  placeholder: "Euro",
  class: "input mb-3",
  type: "number",
  step: "any",
  id: "euro-input",
}) as HTMLInputElement;

// Create swiss franc currency input field
const swissFrancInput = createMarkup("input", currencyConverterForm, {
  placeholder: "Swiss Franc",
  class: "input",
  type: "number",
  step: "any",
  id: "swiss-franc-input",
}) as HTMLInputElement;


// Create clear input button
createMarkup("button", currencyConverterForm, { class: "button mt-3", type: "submit" }, "Clear") as HTMLButtonElement;


// Submit event liste
currencyConverterForm.addEventListener("submit", (e: SubmitEvent): void => {
  e.preventDefault();
  currencyConverterForm.reset();
  console.log("Inputs cleared successfully!");
  error.style.display = "none";
})

// Event Listener to convert from euro to swiss franc
euroInput.addEventListener("input", (inputEvent: Event): void => applyConversion(euroInput, swissFrancInput, inputEvent))

// Event Listener to convert from swiss franc to euro
swissFrancInput.addEventListener("input", (inputEvent: Event): void => applyConversion(swissFrancInput, euroInput, inputEvent))


function applyConversion(firstCurrency: HTMLInputElement, secondCurrency: HTMLInputElement, inputEvent: Event): void {
  // Grab the entered value
  const { value } = inputEvent.currentTarget as HTMLInputElement;

  // Prevent negative values from being entered
  if (+value < 0) {
    // Reset the input fields to 0 and display an error message if the user tries to enter a negative value
    firstCurrency.value = "0";
    secondCurrency.value = "0";

    error.style.display = "block";
    error.innerText = "Negative values are not allowed. Please enter a positive value.";

    setTimeout((): void => {
      error.style.display = "none";
    }, 3000)

    return;
  }

  if (firstCurrency === euroInput) {
    secondCurrency.value = (Number(+value * 0.98).toFixed(2)).toString();
  }

  if (firstCurrency === swissFrancInput) {
    secondCurrency.value = (Number(+value / 0.98).toFixed(2)).toString();
  }
}

