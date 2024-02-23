const allCheckboxlist = document.querySelectorAll(".custom-checkbox");
const allInputfield = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progresslabel = document.querySelector(".progress-label");
const quote = document.querySelector(".quote");

const allQuotes = [
  "Raise the bar by completing your goals!",
  " Well begun is half done!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  " Whoa! You just completed all the goals, time for chill 😊 ",
];

const bottomQuotes = [
  "“Move one step ahead, today!”",
  "“Move one step ahead, today!”",
  "“Move one step ahead, today!”",
  "“Keep Going, You’re making great progress!”",
  "“Keep Going, You’re making great progress!”",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoalsCount = Object.values(allGoals).filter(
  (goals) => goals.completed
).length;

progressValue.style.width = `${
  (completedGoalsCount / allInputfield.length) * 100
}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount} / ${allInputfield.length}  Completed`;
progresslabel.innerText = allQuotes[completedGoalsCount];
quote.innerText = bottomQuotes[completedGoalsCount];

allCheckboxlist.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    // this code is checking weather all input fields are filled or empty
    let allGoalsAdded = [...allInputfield].every((input) => {
      // input.value wo value hai jo hum input field may return karte hai
      return input.value;
    });
    // when all input fields are filled out then give it a checkbox
    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goals) => goals.completed
      ).length;
      progressValue.style.width = `${
        (completedGoalsCount / allInputfield.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount} / ${allInputfield.length}  Completed`;
      progresslabel.innerText = allQuotes[completedGoalsCount];
      quote.innerText = bottomQuotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      // agar goal add nahi kare to error dikha do
      progressBar.classList.add("show-error");
    }
  });
});

allInputfield.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  // jaise hi goals add karne lage input field par focus karo aur error ko hata do
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    // if allGoals are completed then the input field will be non editable and if not true then editable
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
