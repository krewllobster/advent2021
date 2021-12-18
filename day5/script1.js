const fs = require("fs");
const data = fs.readFileSync("./input.txt");
const rows = data.toString().split("\n");

let max_x = 0;
let max_y = 0;

const makeCoords = (row) => {
  return row.split(" -> ").map((str) =>
    str.split(",").map((s) => {
      return parseInt(s, 10);
    })
  );
};

const coordinates = rows.map(makeCoords);

const isHorizontal = ([[x1, y1], [x2, y2]]) => y1 === y2;
const isVertical = ([[x1, y1], [x2, y2]]) => x1 === x2;

const counts = new Map();

const addToCount = (point) => {
  if (counts.has(point)) {
    counts.set(point, counts.get(point) + 1);
  } else {
    counts.set(point, 1);
  }
};

const addVerticalLine = ([[x1, y1], [x2, y2]]) => {
  const yStart = y1 < y2 ? y1 : y2;
  const yEnd = y1 < y2 ? y2 : y1;
  for (let y = yStart; y <= yEnd; y++) {
    addToCount(`${x1}:${y}`);
  }
};

const addHorizontalLine = ([[x1, y1], [x2, y2]]) => {
  const xStart = x1 < x2 ? x1 : x2;
  const xEnd = x1 < x2 ? x2 : x1;
  for (let x = xStart; x <= xEnd; x++) {
    addToCount(`${x}:${y1}`);
  }
};

for (const coord of coordinates) {
  if (isVertical(coord)) {
    addVerticalLine(coord);
  }
  if (isHorizontal(coord)) {
    addHorizontalLine(coord);
  }
}

const overlaps = [...counts.values()].filter((val) => val >= 2);

console.log(overlaps, overlaps.length);
