
const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomValuesArr = () => {
  const valuesArr = [];
  while (valuesArr.length !== 15) {
    const randomValue = getRandomNum(1, 15);
    if (!valuesArr.includes(randomValue)) {
      valuesArr.push(randomValue);
    }
  }
  return valuesArr;
};

const generatePlayingField = (startRowIndex, startColIndex) => {
  const tableEl = document.createElement('table');
  tableEl.className = 'table-bordered';
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === startRowIndex && j === startColIndex) {
        cell.classList.add('table-active');
      }
      const values = getRandomValuesArr();
      cell.textContent = values[i + (j * 4)];
    }
  }
  return tableEl;
};

const getNearEmptyCell = (nearestElements, parentTable) => {
  return nearestElements.reduce((acc, el) => {
    if (parentTable.rows[el[0]] && parentTable.rows[el[0]].cells[el[1]] && parentTable.rows[el[0]].cells[el[1]].childNodes.length === 0) {
      return parentTable.rows[el[0]].cells[el[1]];
    }
    return acc;
  }, null);
};

const getCellToMove = (oldRow, oldCell, event) => {
  if (event.code === 'ArrowDown') {
    return [oldRow - 1, oldCell];
  }
  if (event.code === 'ArrowUp') {
    return [oldRow + 1, oldCell];
  }
  if (event.code === 'ArrowRight') {
    return [oldRow, oldCell - 1];
  }
  if (event.code === 'ArrowLeft') {
    return [oldRow, oldCell + 1];
  }
};

const game = () => {
  const divTable = document.querySelector('.gem-puzzle');
  const table = generatePlayingField(3, 3);
  divTable.appendChild(table);
  const parentTable = document.querySelector('.table-bordered');
  let steps = 0;
  document.body.addEventListener('keydown', event => {
    const emptyCell = document.querySelector('.table-active');
    const [oldRow, oldCell] = [emptyCell.parentElement.rowIndex, emptyCell.cellIndex];
    const [newRow, newCell] = getCellToMove(oldRow, oldCell, event);
    if (newRow < 4 && newCell < 4) {
      const cellToMove = parentTable.rows[newRow].cells[newCell];
      emptyCell.classList.remove('table-active');
      emptyCell.innerHTML = cellToMove.innerHTML;
      cellToMove.innerHTML = '';
      cellToMove.classList.add('table-active');
      const stepsElement = document.querySelector('#steps');
      steps += 1;
      stepsElement.innerHTML = `Number of steps: ${steps}`;
    }
  });
  table.addEventListener('click', event => {
    const clickedEl = event.target;
    const [row, cell] = [clickedEl.parentElement.rowIndex, clickedEl.cellIndex];
    const nearestElements = [[row + 1, cell], [row - 1, cell], [row, cell + 1], [row, cell - 1]];
    const emptyCell = getNearEmptyCell(nearestElements, parentTable);
    if (emptyCell) {
      emptyCell.classList.remove('table-active');
      emptyCell.innerHTML = clickedEl.innerHTML;
      clickedEl.innerHTML = '';
      clickedEl.classList.add('table-active');
      const stepsElement = document.querySelector('#steps');
      steps += 1;
      stepsElement.innerHTML = `Number of steps: ${steps}`;
    }
  });
};
