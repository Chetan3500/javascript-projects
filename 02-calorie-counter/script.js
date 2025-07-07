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
// In HTML, number inputs allow for exponential notation (such as 1e10). You need to filter those out.
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}
// retrieve the of id.value
// console.log(entryDropdown.value)
// add entries to the calorie counter
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  // Each entry will have a text input for the entry's name,
  // and a number input for the calories.
  // To get a count of the number of entries,
  // you can query by text inputs.
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">`;
  // The first argument is a string that specifies the position of the inserted element.
  // The second argument is a string containing the HTML to be inserted.
  targetInputContainer.insertAdjacentHTML("beforeend",HTMLString);
}

addEntryButton.addEventListener('click', addEntry);