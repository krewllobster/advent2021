const fs = require("fs");
const data = fs.readFileSync("./input.txt");
const rows = data.toString().split("\n");

const makeCoords = (row) => {
  return row
    .split(" -> ")
    .map((str) => str.split(",").map((s) => parseInt(s, 10)));
};

console.log(rows.map(makeCoords));
