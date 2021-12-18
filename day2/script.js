const readFile = require("../lib/readfile");

const script = async () => {
  const pos = {
    aim: 0,
    depth: 0,
    horizontal: 0,
  };
  const moves = {
    forward: (x) => {
      pos.horizontal += x;
      pos.depth += pos.aim * x;
    },
    down: (x) => (pos.aim += x),
    up: (x) => (pos.aim -= x),
  };
  const txform = (data) => data.toString().split(" ");
  for await (const [move, x] of readFile("input.txt", txform)) {
    moves[move](parseInt(x));
  }
  console.log(pos.depth * pos.horizontal);
};

script();
