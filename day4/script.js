const readFile = require("../lib/readfile");
const fs = require("fs");
const data = fs.readFileSync("./input.txt");

const rows = data.toString().split("\n");

const instructions = rows.shift().split(",");

const boards = [];
let currentBoard = [];
for (const row of rows) {
  if (row.length > 1) {
    currentBoard.push(row.trim().split(/\s+/));
  }
  if (currentBoard.length === 5) {
    boards.push(currentBoard);
    currentBoard = [];
  }
}

const makeBoard = (board) => {
  const boardRows = [...board];
  const boardColumns = [[], [], [], [], []];
  const boardDiagonals = [[], []];
  board.forEach((row, r) => {
    row.forEach((num, c) => {
      boardColumns[c].push(num);
      if (r === c) {
        boardDiagonals[0].push(num);
      }
      if (r + c === 4) {
        boardDiagonals[1].push(num);
      }
    });
  });
  return {
    boardRows,
    boardColumns,
    boardDiagonals,
  };
};

const boardIsWon = ({ boardRows, boardColumns, boardDiagonals }) => {
  const isWinning = (rows) => rows.some((row) => row.length === 0);
  return (
    isWinning(boardRows) || isWinning(boardColumns) || isWinning(boardDiagonals)
  );
};

const getBoardScore = (rows) => {
  return rows.reduce((sum, row) => {
    return (
      sum +
      row.reduce((rowSum, num) => {
        return rowSum + parseInt(num, 10);
      }, 0)
    );
  }, 0);
};

const onWin = (board, draw) => {
  console.log("YOU WON");
  console.log(board);
  console.log(getBoardScore(board.boardRows));
  console.log(getBoardScore(board.boardRows) * draw);
  process.exit(1);
};

const markBoard = (draw) => (board, idx, arr) => {
  const { boardRows, boardColumns, boardDiagonals } = board;
  const mark = (row) => {
    return row.filter((num) => num !== draw);
  };
  const nextBoard = {
    boardRows: boardRows.map(mark),
    boardColumns: boardColumns.map(mark),
    boardDiagonals: boardDiagonals.map(mark),
  };
  if (boardIsWon(nextBoard)) {
    onWin(nextBoard, draw);
  }
  return nextBoard;
};

const allBoards = boards.map(makeBoard);

instructions.reduce((lastBoards, draw) => {
  return lastBoards.map(markBoard(draw));
}, allBoards);
