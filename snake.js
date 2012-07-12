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

var Snake = {
  moved : false,
  pos : {
    x: 250,
    y: 250
  },
  direction: "RIGHT",
  context: null,
  canvas: null
};

function move(Snake){
  var pos = Snake.pos;
  switch(Snake.direction){
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
      kill(Snake);
    else if(pos[p]>485){
      kill(Snake);
    }
  }
  Snake.pos = pos;
  drawSnake(Snake);
}

function kill(Snake){
  Snake.pos.x = 250;
  Snake.pos.y = 250;
  Snake.direction = "RIGHT";
}

function drawSnake(Snake){
  var pos = Snake.pos;

  Snake.canvas.width = Snake.canvas.width; //clears canvas
  Snake.moved = true;
  Snake.context.fillRect(pos.x, pos.y, 15, 15);
}

document.onkeydown = function(e){
  if(Snake.moved && arrows[e.keyCode] && Snake.direction !== antiArrows[arrows[e.keyCode]]){
    Snake.direction = arrows[e.keyCode];
    Snake.moved = false;
  }
};

(function(){
  Snake.canvas = document.getElementById('board');
  window.onload = function(){
    if(Snake.canvas.getContext){
      Snake.context = Snake.canvas.getContext('2d');
      drawSnake(Snake);
    }

    setInterval(function(){
      move(Snake);
    }, 500);
};
}(Snake));