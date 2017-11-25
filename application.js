
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

const values = getRandomValuesArr();

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
      cell.textContent = values[i + (j * 4)];
    }
  }
  return tableEl;
};

const game = () => {
  const divTable = document.querySelector('.gem-puzzle');
  const table = generatePlayingField(3, 3);
  divTable.appendChild(table);
  let steps = 0;
  table.addEventListener('click', event => {
    const clickedEl = event.target;
    const [row, cell] = [clickedEl.parentElement.rowIndex, clickedEl.cellIndex];
    const nearestElements = [[row + 1, cell], [row - 1, cell], [row, cell + 1], [row, cell - 1]];

    const getNearEmptyCell = (nearestElements) => {
      return nearestElements.reduce((acc, el) => {
        const parentTable = document.querySelector('.table-bordered');
        if (parentTable.rows[el[0]] && parentTable.rows[el[0]].cells[el[1]] && parentTable.rows[el[0]].cells[el[1]].childNodes.length === 0) {
          return parentTable.rows[el[0]].cells[el[1]];
        }
        return acc;
      }, null);
    };

    const emptyCell = getNearEmptyCell(nearestElements);
    if (emptyCell) {
      emptyCell.classList.remove('table-active');
      const clickedNumber = clickedEl.innerHTML;
      emptyCell.innerHTML = clickedNumber;
      clickedEl.innerHTML = '';
      clickedEl.classList.add('table-active');
      const stepsElement = document.querySelector('#steps');
      steps += 1;
      stepsElement.innerHTML = `Number of steps: ${steps}`;
    }
  });
};
