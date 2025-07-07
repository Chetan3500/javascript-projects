// document.getElementById("id-value") -> take id
const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
// user later in program
let isError = false;
// return number without any sign or space
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '')
}