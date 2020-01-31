document.querySelector('#start-button').onclick = function() { //Start button is clicked 
  this.remove()  //removes start button
  startGame() //calls startGame
}

document.onclick = function(e){ //
  console.log(e.x, e.y)
}


const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

canvas.width = window.innerWidth/1.5; //Set canvas width and height
canvas.height = 500

const ctx = canvas.getContext('2d'); //Get the context 


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



let car = {  //Car object - also can be converted to a Class 
  x:0,
  y:0,
  width: 50,
  height: 80
}

function drawCar() {
  ctx.drawImage(img, car.x, car.y, car.width, car.height); //draws the car depending on the coords in the obj above 
}

document.onkeydown = function(e) { //controls -- up down left and right ... 
  switch (e.keyCode) { //changes the car object 
    case 38: car.y-=10;    console.log('up',  ); break;
    case 40: car.y+=10;  console.log('down',); break;
    case 37: car.x-=10;  console.log('left',); break;
    case 39: car.x+=10; console.log('right'); break;
  }
  
}




function animate(){
  let loop = window.requestAnimationFrame(animate) //continues the loop
  
  ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
  
  drawBoard()  //redraws the board over and over and over again
  drawCar()   //redraws the car over and over and over again
  

}