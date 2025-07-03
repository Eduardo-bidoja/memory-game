let secondsElapsed = 0;
let timerInterval = null;
const timerEl = document.getElementById("timer");

// Contador de jogadas
let moveCount = 0;
const moveCounterEl = document.getElementById("moveCounter");

const difficultyLevelEl = document.getElementById("difficultyLevel");
let currentDifficulty = "Easy"; // valor fixo por enquanto
difficultyLevelEl.textContent = `🎯 Difficulty: ${currentDifficulty}`;


// Lista de cidades (fixa neste exemplo)
const cities = [
  { name: "London", image: "img/london.jpg" },
  { name: "Rio", image: "img/rio.jpg" },
  { name: "Paris", image: "img/paris.jpg" },
  { name: "Tokyo", image: "img/tokyo.jpg" }
];

const pairs = [...cities, ...cities];
pairs.sort(() => 0.5 - Math.random());

const board = document.querySelector(".board");

let firstCard = null;
let locked = false;
let matches = 0;

// Iniciar cronômetro
function startTimer() {
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerEl.textContent = `⏱️ Time: ${secondsElapsed}s`;
  }, 1000);
}

// Iniciar imediatamente ao carregar
startTimer();

// Verificar vitória
function checkWin() {
  if (matches === cities.length) {
    clearInterval(timerInterval); // parar o tempo
    document.getElementById("winMessage").innerHTML =
      `🎉 Congratulations! You matched all the cities in <strong>${moveCount}</strong> moves and <strong>${secondsElapsed}</strong> seconds! 🌍`;
    document.getElementById("winMessage").style.display = "block";
  }
}

// Criar cartas
pairs.forEach(city => {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");
  const frontIcon = document.createElement("img");
  frontIcon.src = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
  front.appendChild(frontIcon);

  const back = document.createElement("div");
  back.classList.add("card-back");
  const backImg = document.createElement("img");
  backImg.src = city.image;
  back.appendChild(backImg);

  cardInner.appendChild(front);
  cardInner.appendChild(back);
  card.appendChild(cardInner);

  card.dataset.name = city.name;

  card.addEventListener("click", () => {
    if (locked || card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      moveCount++;
      moveCounterEl.textContent = `🔁 Moves: ${moveCount}`;

      if (firstCard.dataset.name === card.dataset.name) {
        firstCard = null;
        matches++;
        checkWin();
      } else {
        locked = true;
        setTimeout(() => {
          card.classList.remove("flipped");
          firstCard.classList.remove("flipped");
          firstCard = null;
          locked = false;
        }, 1000);
      }
    }
  });

  board.appendChild(card);
});
