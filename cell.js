
class Cell{
  
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.neighbors = [];
    this.visited = false;
    this.walls = {
      TOP: [true, () => line(x    , y    , x + w, y)],
      BOT: [true, () => line(x    , y + h, x + w, y + h)],
      RGT: [true, () => line(x + w, y    , x + w, y + h)],
      LFT: [true, () => line(x    , y    , x    , y + h)]
    }
  }

  show(actual = false){
    stroke(0);
    strokeWeight(2);

    for(let key of Object.getOwnPropertyNames(this.walls)){ 
      if(this.walls[key][0]){
        this.walls[key][1]();
      }
    }
    if(actual) fill(255, 166, 0);
    else if(this.visited) fill(16, 183, 60);
    else fill(243);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }

  getRandomNeighbor(){
    let filtered_neighbors = this.neighbors.filter((x) => !x.visited);
    let index = floor(random(filtered_neighbors.length));
    return filtered_neighbors[index];
  }

  openWall(destiny){
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

