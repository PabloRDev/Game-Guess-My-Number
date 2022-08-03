/*/
- Score and Highscore;
- Check and again buttons;
- Too high/Too low score;
- Number guessed (win) or not guessed (lose).
/*/

const score = document.querySelector(".score");
score.textContent = 20;
const highscore = document.querySelector(".highscore");
highscore.textContent = 0;
let randomNumber = function () {
  return Math.trunc(Math.random() * 20 + 1);
};
const guessNumber = document.querySelector(".number");
guessNumber.value = randomNumber();
const inputNumber = document.querySelector(".guess");
inputNumber.value = "";
const message = document.querySelector(".message");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");

const initialState = {
  score: 20,
  guessNumber: randomNumber(),
  inputNumber: "",
  message: "Start guessing...",
};

const incorrectGuess = (input, guess) => {
  if (input > guess && input <= 20 && input >= 0) {
    score.textContent--;
    return "📈 Too high!";
  } else if (input < guess && input <= 20 && input >= 0) {
    score.textContent--;
    return "📉 Too low!";
  } else {
    return "Invalid number!";
  }
};

checkBtn.addEventListener("click", () => {
  if (inputNumber.value === "") {
    message.textContent = "Please enter a number!";
    return;
  }
  if (guessNumber.value !== +inputNumber.value) {
    // incorrect guess
    message.textContent = incorrectGuess(
      +inputNumber.value,
      +guessNumber.value
    );
  } else {
    // correct guess
    if (score.textContent > highscore.textContent) {
      highscore.textContent = score.textContent;
    }
    checkBtn.disabled = true;
    checkBtn.textContent = "Press enter to play again!";
    checkBtn.style.backgroundColor = "#222";
    checkBtn.style.color = "#eee";
    guessNumber.textContent = guessNumber.value;
    score.textContent = initialState.score;
    message.textContent = "🎉 You guessed it!";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 && message.textContent === "🎉 You guessed it!") {
    againBtn.click();
  }
});

againBtn.addEventListener("click", () => {
  checkBtn.textContent = "Check!";
  checkBtn.style.backgroundColor = "#eee";
  checkBtn.style.color = "#222";

  score.textContent = initialState.score;
  guessNumber.textContent = "?";
  guessNumber.value = randomNumber();
  inputNumber.value = initialState.inputNumber;
  message.textContent = initialState.message;
});
