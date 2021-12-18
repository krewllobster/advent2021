const fs = require("fs");
const data = fs.readFileSync("./input.txt");
const initialFish = data
  .toString()
  .split(",")
  .map((x) => parseInt(x, 10));

const fishReady = (fish) => fish === 0;
const ageFish = (age) => (age === 0 ? 6 : age - 1);

const passDay = (currentFish) => {
  const newFish = currentFish.filter(fishReady).map((_) => 8);
  const agedFish = currentFish.map(ageFish);
  return [...agedFish, ...newFish];
};

let day = 1;
let currentFish = initialFish;
while (day <= 80) {
  currentFish = passDay(currentFish);
  day += 1;
}
console.log(currentFish.length);
