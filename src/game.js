document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");
  const input = document.getElementById("answerInput");
  const clock = document.getElementById("timer");
  const scoreField = document.getElementById("score");
  const highscore = document.getElementById("highscore");
  let currentHighscore = 0;
  let score = 0;
  let time = 60;
  clock.innerHTML = time;
  scoreField.innerHTML = score;

  if (localStorage.getItem("math_highscore")) {
    currentHighscore = localStorage.getItem("math_highscore");
  }
  highscore.innerHTML = currentHighscore;

  let yPosition = 0;
  let xPosition = Math.floor(Math.random() * (canvas.width - 160)) + 50;
  const operations = ["+", "-", "*", "/"];
  let interval;
  let randomIndex;
  let maxNumber;
  let firstNumber;
  let secondNumber;
  let answer;

  function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(
      `${firstNumber} ${operations[randomIndex]} ${secondNumber}`,
      xPosition,
      yPosition
    );
    clock.innerHTML = time;
    scoreField.innerHTML = score;
  }

  function getQuestion() {
    context.font = "30px Arial";
    randomIndex = Math.floor(Math.random() * operations.length);

    if (operations[randomIndex] === "+" || operations[randomIndex] === "-") {
      maxNumber = 100;
    } else if (operations[randomIndex] === "*") {
      maxNumber = 12;
    } else if (operations[randomIndex] === "/") {
      maxNumber = 144;
    }

    firstNumber = Math.floor(Math.random() * maxNumber) + 1;
    secondNumber = Math.floor(Math.random() * maxNumber) + 1;

    if (operations[randomIndex] === "/") {
      while (firstNumber % secondNumber != 0) {
        secondNumber = Math.floor(Math.random() * maxNumber) + 1;
      }
    } else if (operations[randomIndex] === "-") {
      while (firstNumber - secondNumber < 0) {
        secondNumber = Math.floor(Math.random() * maxNumber) + 1;
      }
    }

    switch (operations[randomIndex]) {
      case "+":
        answer = firstNumber + secondNumber;
        break;
      case "-":
        answer = firstNumber - secondNumber;
        break;
      case "*":
        answer = firstNumber * secondNumber;
        break;
      case "/":
        answer = firstNumber / secondNumber;
        break;
    }
  }

  function resetGame() {
    clearInterval(interval);
    yPosition = 0;
    xPosition = Math.floor(Math.random() * (canvas.width - 160)) + 50;
    input.value = "";
    startGame();
  }

  function startGame() {
    getQuestion();
    interval = setInterval(function () {
      drawBoard();
      yPosition += 1;

      if (yPosition % 60 == 0) {
        time -= 1;
      }

      if (yPosition > canvas.height) {
        resetGame();
      }

      if (time <= 0) {
        if (score > currentHighscore) {
          localStorage.setItem("math_highscore", score);
        }
        if (confirm("Game over. Press okay to restart.")) {
          window.location = "./math_madness.html";
        }
      }
    }, 10);
  }

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (input.value == answer) {
        score += 1;
        resetGame();
      }
    }
  });

  startGame();
});
