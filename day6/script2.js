const fs = require("fs");
const data = fs.readFileSync("./input.txt");
const initialFish = data
  .toString()
  .split(",")
  .map((x) => parseInt(x, 10));

const fishReady = (fish) => fish === 0;
const nextAge = (age) => (age === 0 ? 6 : age - 1);

const fishCounts = new Map();
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((x) => fishCounts.set(x, 0));

const addFish = (map, fish) => {
  map.set(fish, 1 + map.get(fish));
};

initialFish.forEach((fish) => addFish(fishCounts, fish));

const passDay = (currentFish) => {
  const nextFish = new Map();
  const newFish = currentFish.get(0) || 0;
  [0, 1, 2, 3, 4, 5, 6, 7].forEach((x) => {
    nextFish.set(x, currentFish.get(x + 1));
  });
  nextFish.set(6, nextFish.get(6) + newFish);
  nextFish.set(8, newFish);
  return nextFish;
};

let day = 1;
let currentFish = fishCounts;
while (day <= 256) {
  currentFish = passDay(currentFish);
  day += 1;
}

console.log(currentFish);
console.log([...currentFish.values()].reduce((a, x) => a + x));
