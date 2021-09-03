import { Board } from './classes/game.js';
// const game = new Game();
const board = new Board();
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