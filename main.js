const tilesContainer = document.querySelector(".tiles");
const colors = [
  "maroon",
  "purple",
  "green",
  "navy",
  "yellow",
  "olive",
  "silver",
  "khaki",
];

const colorsPickList = [...colors, ...colors];
const tileCount = colorsPickList.length;

let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMoove = false;

function buildTile(color) {
  const element = document.createElement("div");
  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", false);

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (awaitingEndOfMoove || revealed === "true" || element == activeTile) {
      return;
    }

    element.style.backgroundColor = color;
    if (!activeTile) {
      activeTile = element;
      return;
    }

    const colorToMatch = activeTile.getAttribute("data-color");
    if (colorToMatch === color) {
      activeTile.setAttribute("data-revealed", true);
      element.setAttribute("data-revealed", true);

      activeTile = null;
      awaitingEndOfMoove = false;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("Great Job! You win! Refresh to play again");
      }
      return;
    }

    awaitingEndOfMoove = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      awaitingEndOfMoove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
}

for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPickList.length);
  const color = colorsPickList[randomIndex];
  const tile = buildTile(color);

  colorsPickList.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
