var arrows = {
  37: "LEFT",
  39: "RIGHT",
  38: "UP"   ,
  40: "DOWN" 
};

var pos = {
  x: 0,
  y: 0
};

var context;

var canvas = document.getElementById('board');

if(canvas.getContext){
  context = canvas.getContext('2d');
  drawSnake(context, pos);
}

document.onkeydown = function(e){
  if(arrows[e.keyCode] === "RIGHT"){
    pos.x+=5;
  }
  else if(arrows[e.keyCode] === "LEFT"){
    pos.x-=5;
  }
  else if(arrows[e.keyCode] === "UP"){
    pos.y-=5;
  }
  else if(arrows[e.keyCode] === "DOWN"){
    pos.y+=5;
  }
  for(p in pos){
    if(pos[p] < 0)
      pos[p] = 0;
    else if(pos[p]>485){
      pos[p] = 485;
    }
  }
  drawSnake(context, pos);
}

function drawSnake(context, pos){
  canvas.width = canvas.width; //clears canvas

  context.fillRect(pos.x, pos.y, 15, 15);
}