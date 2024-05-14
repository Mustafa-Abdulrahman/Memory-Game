let names = document.querySelector(".headOfGame .name");
let tries = document.querySelector(".headOfGame .tries span");
let memoryGameContainer = document.querySelector(".memoryGame");
let blocks = Array.from(document.querySelectorAll(".memoryGame .block"));
let duration = 1000;
let startBtn = document.querySelector(".popUp p");
let winner = 0;

//--------------------------------
let unOrderRange = [...Array(blocks.length).keys()].sort(
  () => Math.random() - 0.5
);
// --------------------------- start function ------------------------
startBtn.addEventListener("click", function () {
  let userName = prompt("Please Enter Your Name");
  while (!userName || isFinite(parseInt(userName))) {
    userName = prompt("Please Enter Your Name");
  }
  names.innerHTML += userName;
  startBtn.parentElement.style.display = "none";
});

// --------------------------- order function ------------------------
blocks.forEach((b, n) => {
  b.style.order = unOrderRange[n];
  b.addEventListener("click", () => {
    flib(b);
  });
});
// --------------------------- blocks function ------------------------

// ---------------------------
function flib(block) {
  block.classList.add("active");
  let activeBlocks = blocks.filter((a) => {
    return a.classList.contains("active");
  });

  if (activeBlocks.length === 2) {
    stopClickFun(block);
    checkIfMatchFun(activeBlocks[0], activeBlocks[1]);
  }
}

function stopClickFun(block) {
  block.parentElement.style.pointerEvents = "none";
  setTimeout(() => {
    block.parentElement.style.pointerEvents = "";
  }, duration);
}
function checkIfMatchFun(first, last) {
  if (first.getAttribute("target") === last.getAttribute("target")) {
    first.classList.remove("active");
    last.classList.remove("active");

    first.classList.add("flibed");
    last.classList.add("flibed");
    winner += 2;
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      first.classList.remove("active");
      last.classList.remove("active");
    }, duration);
  }
  if (winner == blocks.length) {
    setTimeout(() => {
      alert("Congratulation");
    }, duration);
  }
}
