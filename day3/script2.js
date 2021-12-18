const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString().split("\n");

const getNthCharsFromEach = (n, ...data) => {
  let nthChars = "";
  for (let str of data) {
    const nxt = str.slice(n, n + 1);
    if (nxt) nthChars += nxt;
  }
  return nthChars.split("");
};

const getBitRatio = (bits) => {
  const sum = bits.reduce((a, c) => a + c, 0);
  return sum / bits.length;
};

const getOxygenRating = (...data) => {
  let bitPos = 0;
  let retainedNumbers = [...data];
  do {
    const nthChars = getNthCharsFromEach(bitPos, ...retainedNumbers);
    const nthNumbers = nthChars.map((x) => parseInt(x, 10));
    const ratio = getBitRatio(nthNumbers);
    const keep = ratio === 0.5 ? "1" : ratio > 0.5 ? "1" : "0";
    retainedNumbers = retainedNumbers.filter(
      (x) => x.slice(bitPos, bitPos + 1) === keep
    );
    bitPos += 1;
  } while (retainedNumbers.length > 1);
  return retainedNumbers[0];
};

const getCoRating = (...data) => {
  let bitPos = 0;
  let retainedNumbers = [...data];
  do {
    const nthChars = getNthCharsFromEach(bitPos, ...retainedNumbers);
    const nthNumbers = nthChars.map((x) => parseInt(x, 10));
    const ratio = getBitRatio(nthNumbers);
    const keep = ratio === 0.5 ? "0" : ratio > 0.5 ? "0" : "1";
    retainedNumbers = retainedNumbers.filter(
      (x) => x.slice(bitPos, bitPos + 1) === keep
    );
    bitPos += 1;
  } while (retainedNumbers.length > 1);
  return retainedNumbers[0];
};

const script = async () => {
  const ox = getOxygenRating(...data);
  const co = getCoRating(...data);
  console.log(parseInt(ox, 2) * parseInt(co, 2));
};

script();
