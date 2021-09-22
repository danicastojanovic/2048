import { Board } from './game.js';

var board = new Board();
board.initialize(renderState);
document.addEventListener('keydown', move);

function renderState() {
  let state = board.getState();
  let element;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      element = document.getElementById('' + i + j);
      if (state[i][j] !== 0) {
        element.innerHTML = state[i][j];
      } else {
        element.innerHTML = '';
      }
    }
  }
}

function move(e) {
  if(e.code === 'ArrowDown') {
    board.move('down', renderState);
  } else if (e.code === 'ArrowUp') {
    board.move('up', renderState);
  } else if (e.code === 'ArrowRight') {
    board.move('right', renderState);
  } else if (e.code === 'ArrowLeft') {
    board.move('left', renderState);
  }
}

document.getElementById('reset').onclick = function() {
  board = new Board();
  board.initialize(renderState);
};

function swipedetect(){
  var el = document.getElementById('board');
  var swipedir,
  startX,
  startY,
  distX,
  distY,
  threshold = 50, //required min distance traveled to be considered swipe
  restraint = 50, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 500, // maximum time allowed to travel that distance
  elapsedTime,
  startTime;

  el.addEventListener('touchstart', function(e){
    e.preventDefault()
      var touchobj = e.changedTouches[0]
      swipedir = 'none'
      // dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
  }, {passive: false})

  el.addEventListener('touchmove', function(e){
      e.preventDefault() // prevent scrolling when inside DIV
  }, {passive: false})

  el.addEventListener('touchend', function(e){
    e.preventDefault()
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for swipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
              swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
          }
      }
      console.log(swipedir);
      board.move(swipedir, renderState);
  }, {passive: false})
}

swipedetect();