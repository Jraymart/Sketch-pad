const gridContainer = document.querySelector("#grid-container");
let computedSize = window.getComputedStyle(gridContainer).width;
computedSize = parseFloat(computedSize);
let size = 16;
createGrid(size);
const newGrid = document.querySelector("#new-grid");

//function to create a new sized grid
newGrid.addEventListener("click", () => {
    size = prompt("Enter a new size between 1-100: ");
    if (size > 0 && size <= 100) {
        createGrid(size);
    }
    else {
        alert("Size out of bounds! Please enter a number between 1-100");
    }
});
//function to erase grid
const eraseGrid = document.querySelector("#erase-grid");
eraseGrid.addEventListener("click", () => {
    createGrid(size);
});

//function to change colors
let selectedColor = "black";
const colorPick = document.querySelector("#color-picker");
colorPick.addEventListener('input', (e) => {
    selectedColor = e.target.value;
});

function createGrid(size) {
    //clears squares
    gridContainer.innerHTML = '';
    //calculate the size of each square
    const squareSize = computedSize / size;

    //Loop to create squares
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div")
        row.className = 'row';
        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div')
            cell.className = 'cell';
            cell.style.width = `${squareSize}px`;
            cell.style.height = `${squareSize}px`;
            cell.addEventListener("mouseenter", () => {
                cell.style.backgroundColor = selectedColor;
            })
            row.appendChild(cell);
        }

        gridContainer.appendChild(row);
    }
}