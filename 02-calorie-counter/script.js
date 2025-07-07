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

// calculate calories and update output in page
function calculateCalories(e) {
  e.preventDefault(); // preventDefault(): prevent default action submit event i.e reload page.
  isError = false;
  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");
  // pass them to getCaloriesFromInputs
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  // budgetNumberInput assign to an element not array
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput])
  // check global error value
  if (isError) {
    return
  }
  // calculate calories
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  // present output in page
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;
  output.classList.remove('hide');
}

// get the calorie counts from the user's entries
function getCaloriesFromInputs(list) { // list is NodeList
  let calories = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);
    if (invalidInputMatch) {
     alert(`Invalid Input: ${invalidInputMatch[0]}`);
     isError = true;
     return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);