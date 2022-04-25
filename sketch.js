// this version add ascii art disply of the world
// this verision added neighbors message 
// this version added a sum function with reduce to get sum of neighbors
// highlights neighbors on canvas
// change input to click
// add rules for next generation
// added check for life and death and show in html
// added for loop neighbor check 
// added dan shiffmas 2d array code but am doing rows by colloms y by x


let textart;
let playinput;
let output;
let oldWorld = [];
let newWorld = [];
let col = 19;
let row = 19;
let cnvs;
let sz;
let player;
let generation = 0;
let liveCount =0;
let deadCount =0;
let nbutton;
let nextGenbutton;
let livNei;
let makeGenButton;
let namebutton;



function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function setup() {

  textart = select('#textart');
  playinput = select('#input');
  output = select('#output');
  nbutton = select('#neighbutton');
  nbutton.hide();
  nextGenbutton = select('#nextGen');
  nextGenbutton.hide();
  makeGenButton = select('#makeGen');
  makeGenButton.hide();
  namebutton = select('#namein');
  namebutton.mouseClicked(getaction);
  nbutton.mouseClicked(showNei);
  nextGenbutton.mouseClicked(showNextGen);
  makeGenButton.mouseClicked(makeGeneration);
  cnvs = createCanvas(400, 400);
  cnvs.background(255, 0, 0);
  cnvs.parent('canvasHolder');  // sticks the canvas into this html div set in index

  sz = width / col // will always be square
  textSize(sz);
  oldWorld = make2DArray(row,col);
  for (let y = 0; y < row; y++) {
     
    for (let x = 0; x < col; x++) {
      oldWorld[y][x] = floor(random(2));

    }



  }
  console.log(oldWorld);
  
  player = {
    x: floor(random(1, col - 1)),
    y: floor(random(1, row - 1)),
    state: 0,
    name: 'placehold',
    neighbor: []
  }
  // pay attention that oldWorld array is y,x
  player.state = oldWorld[player.y][player.x];
  dspWorld();

}


function dspWorld() {
  let ascart = ""; // empty string to hold the ascii art
  for (let y = 0; y < row; y++) {
    let strow = join(oldWorld[y], ' '); // joins the row array into a string
    let dotstrow = strow.replace(/0/g,"."); // regex and replace
    for (let x = 0; x < col; x++) {
      if (oldWorld[y][x] == 1) {
        fill(0, 0, 255);
      } else {
        fill(255);
      }

      rect(x * sz, y * sz, sz, sz);
      fill(255, 0, 0);
      text(str(oldWorld[y][x]), x * sz, y * sz + sz);


    }

    ascart += dotstrow; // adds that string to athe ascii art string
    ascart += "\n" // puts a line break on it so it forms a grid

  }

  textart.html(ascart); // updates the text art <pre> tag 

}


function dspPlayer() {
  fill(0, 255, 0);
  rect(player.x * sz, player.y * sz, sz, sz);
  fill(255, 0, 0);
  text(str(player.state), player.x* sz, player.y * sz + sz);

}

function getaction() {

  if (generation == 0) {
    player.name = playinput.value();

  }

  dspPlayer();
  if (player.state == 1) {
    
    liveCount+=1;
    output.html(player.name + ', you are alive this generation '+generation+'.\nGenerations dead: '+deadCount+' Generations alive: '+liveCount);

  } else {

    deadCount+=1;
    output.html(player.name + ', you are dead this generation '+generation+'.\nGenerations dead: '+deadCount+' Generations alive: '+liveCount);


  }
  playinput.hide();
  namebutton.hide();
  nbutton.show();
   




}

function showNei() {
  // pay attention that the oldWorld array is y,x not x,y
  nbutton.hide();
  let neimess = player.name + ', these are your neighbors:\n *******************\n';
  
  player.neighbor[0]=oldWorld[player.y-1][player.x-1];
  fill(255,255, 0,150);
  rect((player.x-1)* sz, (player.y-1)* sz, sz, sz);
  if (player.neighbor[0]==1){
  neimess += 'Your top left neighbor is alive!\n'; 
  }else{
    neimess += 'Your top left neighbor is dead!\n';
  }
  player.neighbor[1]=oldWorld[player.y-1][player.x];
  fill(255,255, 0,150);
  rect((player.x)* sz, (player.y-1)* sz, sz, sz);
  if (player.neighbor[1]==1){
  neimess += 'Your top neighbor is alive!\n'; 
  }else{
    neimess += 'Your top neighbor is dead!\n';
  }
  player.neighbor[2]=oldWorld[player.y-1][player.x+1];
  fill(255,255, 0,150);
  rect((player.x+1)* sz, (player.y-1)* sz, sz, sz);
  if (player.neighbor[2]==1){
  neimess += 'Your top right neighbor is alive!\n'; 
  }else{
    neimess += 'Your top right neighbor is dead!\n';
  }
  player.neighbor[3]=oldWorld[player.y][player.x-1];
  fill(255,255, 0,150);
  rect((player.x-1)* sz, (player.y)* sz, sz, sz);
  if (player.neighbor[3]==1){
  neimess += 'Your left-side neighbor is alive!\n'; 
  }else{
    neimess += 'Your left-side neighbor is dead!\n';
  }
  player.neighbor[4]=oldWorld[player.y][player.x+1];
  fill(255,255, 0,150);
  rect((player.x+1)* sz, (player.y)* sz, sz, sz);
  if (player.neighbor[4]==1){
  neimess += 'Your right-side neighbor is alive!\n';
  }else{
    neimess += 'Your right-side neighbor is dead!\n';
  }
  player.neighbor[5]=oldWorld[player.y+1][player.x-1];
  fill(255,255, 0,150);
  rect((player.x-1)* sz, (player.y+1)* sz, sz, sz);
  if (player.neighbor[5]==1){
  neimess += 'Your bottom left neighbor is alive!\n'; 
  }else{
    neimess += 'Your bottom left neighbor is dead!\n';
  }
  player.neighbor[6]=oldWorld[player.y+1][player.x];
  fill(255,255, 0,150);
  rect((player.x)* sz, (player.y+1)* sz, sz, sz);
  if (player.neighbor[6]==1){
  neimess += 'Your bottom neighbor is alive!\n'; 
  }else{
    neimess += 'Your bottom neighbor is dead!\n';
  }
  player.neighbor[7]=oldWorld[player.y+1][player.x+1];
  fill(255,255, 0,150);
  rect((player.x+1)* sz, (player.y+1)* sz, sz, sz);
  if (player.neighbor[7]==1){
  neimess += 'Your bottom right neighbor is alive!\n'; 
  }else{
    neimess += 'Your bottom right neighbor is dead!\n';
  }
  neimess += 'So it goes!!!!\n';
  livNei = player.neighbor.reduce((a,b) => a+b,0);
  neimess+=`you have ${livNei} live neighbors!!`;
  output.html(neimess);
  nextGenbutton.show();
  

}

function showNextGen(){
 
  nextGenMess=`Here are the rules:
  1. Any live cell with more than three live neighbors dies, as if by overpopulation.
  2. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
  3. Any live cell with two or three live neighbors lives on to the next generation.
  4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.\n`
  
  nextGenMess +=`*******************\n You have ${livNei} live neighbors!!\n`;
  
  if (player.state == 1 && livNei <2){
  nextGenMess +=`*******************\n I am sorry ${player.name} your will die by underpopulation.\n`; // die
    player.state=0;
    } 
    else if (player.state == 1 && livNei >3) {
     nextGenMess +=`*******************\n I am sorry ${player.name} your will die by overpopulation.\n`; //die
      player.state=0;
    }
    
    else if (player.state == 0 && livNei ==3){
     nextGenMess +=`*******************\n Rejoice although you are dead ${player.name} you will come to life as if by reproduction.\n`; // live from reproduction
      player.state=1;
    }
    else{
       nextGenMess +=`*******************\n Such is the universe ${player.name} there will be no change next generation.\n`;
    }
  
  
  output.html(nextGenMess);
  nextGenbutton.hide();
  makeGenButton.show();
  
}


function makeGeneration(){
     generation++
      let next = make2DArray(col, row);

  // Compute next based on grid
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      let state = oldWorld[i][j];
      // Count live neighbors!
      let sum = 0;
      let neighbors = countNeighbors(oldWorld, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  oldWorld = next;
  dspWorld();
  makeGenButton.hide();
  getaction();
  
  
  
}







function countNeighbors(grid, y,x){
  let sum =0;
  for (let ni =-1; ni<2;ni++){
      
    for(let nj=-1; nj<2;nj++){
       sum +=  grid[(ni+y+row)%row][(nj+x+col)%col];
          
        }
      }
  sum -= grid[y][x]
  
  return sum
}