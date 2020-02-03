document.querySelector('#start-button').onclick = function() { //Start button is clicked 
  this.remove()  //removes start button
  startGame() //calls startGame
  startLines()
  startObstacles()
}

document.onclick = function(e){ //
  console.log(e.x, e.y)
}


const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

canvas.width = window.innerWidth/1.5; //Set canvas width and height
canvas.height = window.innerHeight - 100 ;

const ctx = canvas.getContext('2d'); //Get the context 



document.querySelector("#start-button").click() //CLicks button for me on load




function startGame(){  
  console.log("START") 
  img.onload = function() {  //Load the car for the first time 
     ctx.drawImage(img, car.x, car.y, car.width, car.height); 
  }
  img.src = "./images/car.png";

  window.requestAnimationFrame(animate) //Starts the animation infinite loop
}


function drawBoard() {
  ctx.fillStyle = 'green'
  ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass 
  ctx.fillStyle = 'grey'
  ctx.fillRect(100,0,canvas.width-200, canvas.height) //draws the road 
}







/** */
let obstacles = []

function drawObstacle(){
  obstacles.forEach(obstacle=>{
    ctx.fillStyle = 'red'
     
    if(obstacle.direction){
      ctx.fillRect(obstacle.x++, obstacle.y+=5, obstacle.width, obstacle.height)
    } else {
      ctx.fillRect(obstacle.x--, obstacle.y+=5, obstacle.width, obstacle.height)

    }
  })
}

function startObstacles(){
  setInterval(function(){
    let obs = {
      x:Math.random()*canvas.width,
      y:-10,
      width:Math.random()*300 + 50,
      height: 40,
      direction: Math.random() >= 0.5//randomly true or false 
    }

    obstacles.push(obs)

  }, 1000)
}






function checkCollision(){
  //  console.log(frameId)
  obstacles.forEach(obstacle => {
    if (car.x < obstacle.x + obstacle.width &&
      car.x + car.width > obstacle.x &&
      car.y < obstacle.y + obstacle.height &&
      car.y + car.height > obstacle.y) {
       //console.log('collision detected!');
       window.cancelAnimationFrame(frameId)
   }
  })
}


function checkShotCollision(){
  obstacles.forEach((obstacle, i) => { //loop through all the obstacles 
    shots.forEach((shot, j) => { //loop through all the shots 
      if (shot.x < obstacle.x + obstacle.width &&
        shot.x + shot.width > obstacle.x &&
        shot.y < obstacle.y + obstacle.height &&
        shot.y + shot.height > obstacle.y) {
         console.log('shot collision detected!', i, j);
         obstacles.splice(i, 1) //destroys obstacle
         shots.splice(j, 1) //destroys the shot
     }
    })

  })
}




function isOffRoad(){
  if(car.x < 100){ //car has hit left grass
    car.x = 100
  }
  if(car.x > canvas.width - 100 - car.width){
    car.x = canvas.width - 100 - car.width 
  }
}










/**This creates random lines and moves them down */
let lines = [] //This should be all our lines 

function drawLine(){ 
    lines.forEach(line=>{ //Loop through our lines array 
      ctx.fillStyle = line.color
      ctx.fillRect(line.x, line.y+=5, line.width, line.height) //increment each line in the line array
    })
}

function startLines(){
  setInterval(()=>{
    let line = { //We create our new line object 
      x:canvas.width/2-5,
      y:0,
      width:10,
      height:20,
      color: "#"+((1<<24)*Math.random()|0).toString(16)
    }
    lines.push(line) //We add this line to our lines array 
    //console.log(lines)
  },200)
}







let car = {  //Car object - also can be converted to a Class 
  x:canvas.width / 2 - 25,
  y:canvas.height * 3/4 ,
  width: 50,
  height: 80
}

function drawCar() {
  ctx.drawImage(img, car.x, car.y, car.width, car.height); //draws the car depending on the coords in the obj above 
}

document.onkeydown = function(e) { //controls -- up down left and right ... 
  console.log(e.keyCode)
  switch (e.keyCode) { //changes the car object 
    case 38: car.y-=30;    console.log('up',  ); break;
    case 40: car.y+=30;  console.log('down',); break;
    case 37: car.x-=30;  console.log('left',); break;
    case 39: car.x+=30; console.log('right'); break;
    case 32: shotFired(); break  //hit space bar and fire shot
  }
  
}

let frameId; 

let scoreBoard = document.querySelector('#score')
let score = 0; 


let shots = [] 


function shotFired() { //fire shot 
  let shot = {  //
    x:car.x + car.width /2, ///shots are always fired from the location of the car
    y:car.y,
    width: 5,
    height: 8,
    color:'blue'
  }
  shots.push(shot) //add this shot to an array of shots
}


function drawShots(){
  shots.forEach(shot=>{ //Loop through our shots array 
    ctx.fillStyle = shot.color
    ctx.fillRect(shot.x, shot.y-=5, shot.width, shot.height) //decrement each shot in the shot array - move shot up screen
  })
}


function animate(){ //WHERE ALL THE MAGIC HAPPENS
  
  score++
  scoreBoard.innerHTML = score;

  frameId = window.requestAnimationFrame(animate) //continues the loop
  
  ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
  
  drawBoard()  //redraws the board over and over and over again
  drawLine()
  drawCar()   //redraws the car over and over and over again
  drawObstacle()
  checkCollision() //Check if car has hit an obstacle
  checkShotCollision()
  isOffRoad()
  drawShots()
}