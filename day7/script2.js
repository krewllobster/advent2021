const fs = require("fs");
const data = fs.readFileSync("./input.txt");
const initialData = data
  .toString()
  .split(",")
  .map((x) => parseInt(x, 10))
  .sort((a, b) => a - b);

const initialPositions = new Map();

for (const pos of initialData) {
  if (initialPositions.has(pos)) {
    initialPositions.set(pos, initialPositions.get(pos) + 1);
  } else {
    initialPositions.set(pos, 1);
  }
}

const calculateFuel = (count, pos, target) => {
  let dist = Math.abs(pos - target);
  let cost = 0;
  for (let i = 1; i <= dist; i++) {
    cost += count * i;
  }
  return cost;
};

const getFuelCost = (positions, target) => {
  let fuelCost = 0;
  for (const [pos, count] of positions.entries()) {
    fuelCost += calculateFuel(count, pos, target);
  }
  return fuelCost;
};

console.log(initialPositions);

const minPos = Math.min(...initialPositions.keys());
const maxPos = Math.max(...initialPositions.keys());

const fuelCosts = [];

let x = minPos;

while (x < maxPos) {
  fuelCosts.push(getFuelCost(initialPositions, x));
  x += 1;
}
console.log(Math.min(...fuelCosts));
