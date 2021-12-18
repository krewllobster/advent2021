const readFile = require("../lib/readfile");
const sumArray = (arr) => arr.reduce((acc, x) => acc + x, 0);

const script = async () => {
  let count = 0;
  let last = 0;
  const buffer = [];
  for await (const number of readFile("input.txt", (x) => parseInt(x, 10))) {
    buffer.push(number);
    if (buffer.length > 3) buffer.shift();
    const sum = sumArray(buffer);
    if (buffer.length === 3) {
      if (last && sum > last) {
        console.log(last, sum);
        count += 1;
      }
      last = sum;
    }
  }
  console.log(count);
};

script();
