const gridContainer = document.querySelector("#grid-container");
let computedSize = window.getComputedStyle(gridContainer).width;
computedSize = parseFloat(computedSize);
let size = 16;
let enableDrawing = false;
let gaymode = false;
let darkenMode = false;
//function that toggles drawing through mouse click
gridContainer.addEventListener('mousedown', () => {
    enableDrawing = !enableDrawing;
});

gridContainer.addEventListener('mouseup', () => {
    enableDrawing = false;
});

const rainbow = document.querySelector("#rainbow");
//function to generate random colors
function getRainbow(){
    const r = Math.floor(Math.random() * 256); // Red value (0-255)
    const g = Math.floor(Math.random() * 256); // Green value (0-255)
    const b = Math.floor(Math.random() * 256); // Blue value (0-255)
    return `rgb(${r}, ${g}, ${b})`;
}
rainbow.addEventListener("click", ()=>{
    gaymode = !gaymode;
});

//function to darken by 10% everytime a square is hovered
const darken = document.querySelector("#darken");
darken.addEventListener("click", () =>{
    darkenMode = !darkenMode;
});


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
const colorPickerButton = document.querySelector("#color-picker-button");
colorPickerButton.addEventListener("click", ()=>{
    colorPick.click();
});
colorPick.addEventListener('input', (e) => {
    selectedColor = e.target.value;
    colorPickerButton.style.backgroundColor =e.target.value;
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
            cell.style.opacity = 0;
            cell.addEventListener("mouseenter", () => {
                if (enableDrawing) {
                    let color = selectedColor;
                    if(gaymode){
                        color = getRainbow();
                    }
                    if(darkenMode){
                        let currentOpac = parseFloat(cell.style.opacity);
                        if(currentOpac < 1){
                            cell.style.opacity = currentOpac + 0.1;
                        }
                    }
                    else{
                        cell.style.opacity = 1
                    };
                    cell.style.backgroundColor = color;
                };
            });
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}