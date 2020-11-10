// Maze generator
// Manuel Rivas
// November 10th 2020

const cols = 25;
const rows = 25;

let actual_cell;
let cell_width;
let cell_height;
let cells;
let visited_cells = [];

const make2DArray = (rows, cols) => {
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
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array[i].length; j++){
      func(array, i, j);
    }
  }
}


const getNeighbors = (array, i, j) => {
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

  cell_width = width / cols;
  cell_height = height / rows;

  cells = make2DArray(rows, cols);

  makeOn2DArray(cells, (ar, x, y) => {
    ar[x][y] = new Cell(y * cell_width, x * cell_height, cell_width, cell_height);
  }) 

  makeOn2DArray(cells, (ar, x, y) => ar[x][y].neighbors = (getNeighbors(ar, x, y)));
  
  actual = cells[0][0];
  
}


function draw(){
  background(55);
  actual.visited = true; 

  visited_cells.push(actual);
  
  let next_cell = actual.getRandomNeighbor();
  if(next_cell != undefined){
    actual.openWall(next_cell);
    actual = next_cell;
  } else{
    for(let i = visited_cells.length - 1; i >= 0; i--){
      actual = visited_cells.pop();
      actual.show(true);
      if (actual.getRandomNeighbor() != undefined){
        break;
      }
    }
  }
  makeOn2DArray(cells, (ar, x, y) => ar[x][y].show(ar[x][y] == actual ? true : false));
  if(visited_cells.length === 0){
    noLoop();
    alert("Maze finished");
  }
}

