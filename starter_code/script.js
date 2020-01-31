document.body.querySelector('#start-button').onclick = function() {
  this.remove()
  startGame()
}

const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth/1.5;
canvas.height = 500
const ctx = canvas.getContext('2d');

function startGame() {
  console.log('START')
  ctx.fillStyle = 'green'
  ctx.fillRect(0,0,canvas.width, canvas.height)

  ctx.fillStyle = 'grey'
  ctx.fillRect(100,0,canvas.width-200, canvas.height)
}

function draw(car) {
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, car.x, car.y, 50, 50);
  }
  // img.scr = ".../link to the car.png/"
}

function animate() {
  let loop = window.requestAnimationFrame(animate)
}

// window.onload = function() {
//   document.getElementById("start-button").onclick = function() {
//     startGame();
//   };

//   function startGame() {

//   }
// };
