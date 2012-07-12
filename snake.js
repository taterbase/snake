"use strict";
var arrows = {
  37: "LEFT",
  39: "RIGHT",
  38: "UP"   ,
  40: "DOWN"
};

var childMath = {
  "LEFT": function(pos){
    return {
      x: pos.x + 20,
      y: pos.y
    };
  },
  "RIGHT": function(pos){
    return {
      x: pos.x - 20,
      y: pos.y
    };
  },
  "UP": function(pos){
    return {
      x: pos.x,
      y: pos.y + 20
    };
  },
  "DOWN": function(pos){
    return {
      x: pos.x,
      y: pos.y - 20
    };
  }
};

var antiArrows = {
  "LEFT": "RIGHT",
  "RIGHT": "LEFT",
  "UP": "DOWN",
  "DOWN": "UP"
};

var Snake = {
  context: null,
  canvas: null,
  moved : false,
  children: [
    {
      pos : {
        x: 250,
        y: 250
      },
      direction: "RIGHT",
      prevDirection: "RIGHT"
    }
  ]
};

function move(Snake){
  var prevSnake = null;
  var snake = null;

  for(snake in Snake.children){
    snake = Snake.children[snake];

    snake.prevDirection = snake.direction;
    
    switch(snake.direction){
      case "LEFT":
        snake.pos.x-= 20;
        break;
      case "RIGHT":
        snake.pos.x+= 20;
        break;
      case "UP":
        snake.pos.y-= 20;
        break;
      case "DOWN":
        snake.pos.y+= 20;
        break;
    }
    //Check to make sure we're not at the wall
    for(var p in snake.pos){
      if(snake.pos[p] < 0)
        return kill(Snake);
      else if(snake.pos[p]>485){
        return kill(Snake);
      }
    }
    if(prevSnake !== null)
      snake.direction = prevSnake.prevDirection;

    prevSnake = snake;
  }
  drawSnake(Snake);
}

function kill(Snake){
  Snake.children = [
    {
      pos : {
        x : 250,
        y : 250
      },
    direction : "RIGHT",
    prevDirection: "RIGHT"
    }
  ];
}

function drawSnake(Snake){
  Snake.canvas.width = Snake.canvas.width; //clears canvas

  for(var snake in Snake.children){
    snake = Snake.children[snake];
    Snake.context.fillRect(snake.pos.x, snake.pos.y, 15, 15);
  }
  Snake.moved = true;
}

function changeDirection(Snake, e){
  if(Snake.moved && arrows[e.keyCode] && Snake.children[0].direction !== antiArrows[arrows[e.keyCode]]){
    Snake.children[0].direction = arrows[e.keyCode];
    Snake.moved = false;
  }
}

function addChild(Snake){
  var child = {}
    , parent = Snake.children[Snake.children.length - 1];

  child.pos = childMath[parent.direction](parent.pos);
  child.direction = parent.direction;
  child.prevDirection = parent.direction;
  Snake.children.push(child);
}

(function(Snake){
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

  document.onkeydown = function(e){
    if(arrows[e.keyCode])
      changeDirection(Snake, e);
    else
      addChild(Snake);
  };
}(Snake));