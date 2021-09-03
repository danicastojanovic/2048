var Board = class {
  #state = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  #next = 2;
  constructor() {
  }

  randomPlacement() {
    let getRandomIntInclusive = () => {
      return Math.floor(Math.random() * 4);
    }

    let i = getRandomIntInclusive();
    let j = getRandomIntInclusive();

    let state = this.getState();
    if (state[i][j] === 0) {
      state[i][j] = this.#next;
      this.toggleNext();
    } else {
      if (!this.gameStatusOn()) return;
      this.randomPlacement();
    }
    if (!this.gameStatusOn()) return;
    return state;
  }

  toggleNext() {
    if (this.#next === 2) {
      this.#next = 4;
    } else {
      this.#next = 2;
    }
  }

  move(direction, callback) {
    let hasChanged = false;
    let oldState = this.getState();
    let newState = [[], [], [], []];
    if (direction === 'left' || direction === 'right') {
      for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 0; j < 4; j++) {
          if (oldState[i][j] !== 0) {
            row.push(oldState[i][j]);
          }
        }
        let newRow = [];
        if (direction === 'left') {
          for (let i = 0; i < row.length; i++) {
            if (row[i] === row[i + 1]) {
              newRow.push(2 * row[i]);
              if (row[i] * 2 === 2048) alert('You Win!');
              i += 1;
            } else {
              newRow.push(row[i]);
            }
          }
          while(newRow.length < 4) {
            newRow.push(0);
          }
        } else {
          for (let i = row.length - 1; i >= 0; i--) {
            if (row[i] === row[i - 1]) {
              newRow.unshift(2 * row[i]);
              if (row[i] * 2 === 2048) alert('You Win!');
              i -= 1;
            } else {
              newRow.unshift(row[i]);
            }
          }
          while(newRow.length < 4) {
            newRow.unshift(0);
          }
        }
        //check if rows have changed
        if (!arrayEquals(oldState[i], newRow)) hasChanged = true;

        newState[i] = newRow;
      }
    }
    if (direction === 'down' || direction === 'up') {
      for (let j = 0; j < 4; j++) {
        let column = [];
        let oldColumn = [];
        for (let i = 0; i < 4; i++) {
          oldColumn.push(oldState[i][j]);
          if (oldState[i][j] !== 0) {
            column.push(oldState[i][j]);
          }
        }
        let newColumn = [];
        if (direction === 'up') {
          for (let i = 0; i < column.length; i++) {
            if (column[i] === column[i + 1]) {
              newColumn.push(2 * column[i]);
              if (column[i] * 2 === 2048) alert('You Win!');
              i += 1;
            } else {
              newColumn.push(column[i]);
            }
          }
          while(newColumn.length < 4) {
            newColumn.push(0);
          }
        } else {
          for (let i = column.length - 1; i >= 0; i--) {
            if (column[i] === column[i - 1]) {
              newColumn.unshift(2 * column[i]);
              if (column[i] * 2 === 2048) alert('You Win!');
              i -= 1;
            } else {
              newColumn.unshift(column[i]);
            }
          }
          while(newColumn.length < 4) {
            newColumn.unshift(0);
          }
        }

        if (!arrayEquals(oldColumn, newColumn)) hasChanged = true;

        for (let i = 0; i < 4; i++) {
          newState[i][j] = newColumn[i];
        }
      }
    }
    // only update state if there is a change
    if (hasChanged) {
      this.setState(newState);
      this.randomPlacement();
    }
    if (callback) {
      callback();
    }
  }

  initialize(callback) {
    this.setState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    this.randomPlacement();
    this.randomPlacement();
    if (callback) {
      callback();
    }
  }

  gameStatusOn() {
    let state = this.getState();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let cur = state[i][j];
        if (cur === 0) return true;
        if (i > 0) {
          if (cur === state[i - 1][j]) return true;
        }
        if (j > 0) {
          if (cur === state[i][j - 1]) return true;
        }
        if (i < 3) {
          if (cur === state[i + 1][j]) return true;
        }
        if (j < 3) {
          if (cur === state[i][j + 1]) return true;
        }
      }
    }
    alert('Game Over!');
    return false;
  }

  getState() {
    return this.#state
  }

  setState(newState) {
    this.#state = newState;
  }
}

export { Board };

function arrayEquals(a, b) {
  return a.length === b.length &&
    a.every((val, index) => val === b[index]);
}