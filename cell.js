// Cell class, it just act as a "tile" on the maze

class Cell{
  
  constructor(x, y, w, h){
    // Position on the canvas, and his width-height variables
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    // Initializes the neighbors variable, wich stores the closest other tiles
    // Also starts the visited variable, wich says if this tile was visited (duh?)
    this.neighbors = [];
    this.visited = false;
    // This object stores the walls, if they should be drawn or not
    // and a function to draw it
    this.walls = {
      TOP: [true, () => line(x    , y    , x + w, y)],
      BOT: [true, () => line(x    , y + h, x + w, y + h)],
      RGT: [true, () => line(x + w, y    , x + w, y + h)],
      LFT: [true, () => line(x    , y    , x    , y + h)]
    }
  }

  show(actual = false){
    // This function shows the actual tile
    stroke(0);
    strokeWeight(2);
    // Decides wich wall should draw
    for(let key of Object.getOwnPropertyNames(this.walls)){ 
      if(this.walls[key][0]){
        this.walls[key][1]();
      }
    }
    // Decides the color of the tile, if it is the actual one, if it was visited or not
    if(actual) fill(255, 166, 0);
    else if(this.visited) fill(16, 183, 60);
    else fill(243);
    noStroke();
    // Draw the color of the tile, decided above
    rect(this.x, this.y, this.width, this.height);
  }

  getRandomNeighbor(){
    // Returns a random not visited neighbor
    let filtered_neighbors = this.neighbors.filter((x) => !x.visited);
    let index = floor(random(filtered_neighbors.length));
    return filtered_neighbors[index];
  }

  openWall(destiny){
    // It just "turn off" the walls that connect two tiles
    let my_wall;
    let dest_wall;

    if(this.x === destiny.x){
      my_wall = this.y < destiny.y? "BOT" : "TOP";
      dest_wall = destiny.y < this.y? "BOT" : "TOP";
    } else if(this.y === destiny.y){
      my_wall = this.x < destiny.x? "RGT" : "LFT";
      dest_wall = destiny.x < this.x? "RGT" : "LFT";
    }
    
    this.walls[my_wall][0] = false;
    destiny.walls[dest_wall][0] = false;
  }

}

