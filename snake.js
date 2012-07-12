"use strict";
var arrows = {
  37: "LEFT",
  39: "RIGHT",
  38: "UP"   ,
  40: "DOWN"
};
var antiArrows = {
  "LEFT": "RIGHT",
  "RIGHT": "LEFT",
  "UP": "DOWN",
  "DOWN": "UP"
};

var moved = false;

var pos = {
  x: 0,
  y: 0
};

var context
  , direction = "RIGHT"
  , canvas = document.getElementById('board');

window.onload = function(){
  if(canvas.getContext){
    context = canvas.getContext('2d');
    drawSnake(context, pos);
  }

  setInterval(function(){
    move(direction);
  }, 500);
};

function move(direction){
  switch(direction){
    case "LEFT":
      pos.x-= 5;
      break;
    case "RIGHT":
      pos.x+= 5;
      break;
    case "UP":
      pos.y-= 5;
      break;
    case "DOWN":
      pos.y+= 5;
      break;
  }
  //Check to make sure we're not at the wall
  for(var p in pos){
    if(pos[p] < 0)
      die();
    else if(pos[p]>485){
      die();
    }
  }
  drawSnake(context, pos);
}

function die(){
  pos.x = 0;
  pos.y = 0;
  direction = "RIGHT";
}

function drawSnake(context, pos){
  canvas.width = canvas.width; //clears canvas
  moved = true;
  context.fillRect(pos.x, pos.y, 15, 15);
}

document.onkeydown = function(e){
  if(moved && arrows[e.keyCode] && direction !== antiArrows[arrows[e.keyCode]]){
    direction = arrows[e.keyCode];
    moved = false;
  }
};