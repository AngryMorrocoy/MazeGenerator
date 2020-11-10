// Maze generator
// Manuel Rivas
// November 10th 2020

const cols = 25;  // Columns number
const rows = 25;  // Rows number

let actual_cell;  // Stores the cell (tile) where the program is at
let cell_width;   // The width of each tile
let cell_height;  // The height of each tile
let cells;        // A bidimensional array that stores all the cells (tiles)
let visited_cells = []; // Stores the cells where I've already been so i can comeback

const make2DArray = (rows, cols) => {
  // Creates a bidimensional array with a number of "rows" and "columns"
  let array = [];
  for(let i = 0; i < rows; i++){
    let row = [];
    for(let j = 0; j < cols; j++){
      row.push(0)
    }
    array.push(row)
  }
  return array;
}


const makeOn2DArray = (array, func = (array, x, y) => undefined) => {
  // Goes through a bidimensional array and executes a function for each item
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array[i].length; j++){
      func(array, i, j);
    }
  }
}


const getNeighbors = (array, i, j) => {
  // Return the neighbors of a given item of an array, excluding itself
  let neighbors = [];
  
  for(let i2 = i - 1; i2 < i + 2; i2++){
    if(i2 != -1 && i2 != array.length){
      neighbors.push(array[i2][j])
    }
  }

  for(let j2 = j - 1; j2 < j + 2; j2++){
    if(j2 != -1 && j2 != array.length){
      neighbors.push(array[i][j2]);
    }
  }
  
  return neighbors.filter((x) => x != array[i][j]);
}


function setup(){
  createCanvas(500, 500);

  cell_width = width / cols;   // Calculates the width of each cell
  cell_height = height / rows; // Calculates the height of each cell

  cells = make2DArray(rows, cols);  // Initializes the bidimensional array that will store the cells

  // Create a cell on each item of the bidimensional array
  makeOn2DArray(cells, (ar, x, y) => {
    ar[x][y] = new Cell(y * cell_width, x * cell_height, cell_width, cell_height);
  })

  // Connect all the cells
  makeOn2DArray(cells, (ar, x, y) => ar[x][y].neighbors = (getNeighbors(ar, x, y)));
  
  // The start cell
  actual = cells[0][0];
  
}


function draw(){
  background(55);
  // Set the actual cell to visited
  actual.visited = true; 
  // Append the actual cell to the path, so I can comeback
  visited_cells.push(actual);
  // Get the cell wich will go next
  let next_cell = actual.getRandomNeighbor();
  // Decides if the next_cell is valid
  if(next_cell != undefined){
    actual.openWall(next_cell);
    actual = next_cell;
  } else{  // If not it will go back in the visited_cells array and find the first valid one
    for(let i = visited_cells.length - 1; i >= 0; i--){
      actual = visited_cells.pop();
      actual.show(true);
      if (actual.getRandomNeighbor() != undefined){
        break;
      }
    }
  }
  // Draw all the cells
  makeOn2DArray(cells, (ar, x, y) => ar[x][y].show(ar[x][y] == actual ? true : false));
  // Decides when the maze is finished
  if(visited_cells.length === 0){
    noLoop();
    alert("Maze finished");
  }
}

