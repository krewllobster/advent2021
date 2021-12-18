const fs = require("fs");
const data = fs.readFileSync("./input.txt").toString().split("\n");

const script = async () => {
  const counts = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  const updateCounts = (str) => {
    str.split("").forEach((x, i) => {
      counts[i][Number(x)] += 1;
    });
  };

  const makeGamma = (arr) => {
    return [...arr].map(([zero, one]) => (one > zero ? "1" : "0")).join("");
  };

  const makeEpsilon = (arr) => {
    return [...arr].map(([zero, one]) => (one < zero ? "1" : "0")).join("");
  };

  data.forEach(updateCounts);

  const gamma = makeGamma(counts);
  const epsilon = makeEpsilon(counts);

  const gammaNum = parseInt(gamma, 2);
  const epsilonNum = parseInt(epsilon, 2);

  console.log(gammaNum * epsilonNum);
};

script();
