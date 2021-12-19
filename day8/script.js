const fs = require("fs");
const text = fs.readFileSync("./input.txt").toString();

const numbers = new Map();
const a = "a",
  b = "b",
  c = "c",
  d = "d",
  e = "e",
  f = "f",
  g = "g";
numbers.set(0, new Set([a, b, c, e, f, g]));
numbers.set(1, new Set([c, f]));
numbers.set(2, new Set([a, c, d, e, g]));
numbers.set(3, new Set([a, c, d, f, g]));
numbers.set(4, new Set([b, c, d, f]));
numbers.set(5, new Set([a, b, d, f, g]));
numbers.set(6, new Set([a, b, d, e, f, g]));
numbers.set(7, new Set([a, c, f]));
numbers.set(8, new Set([a, b, c, d, e, f, g]));
numbers.set(9, new Set([a, b, c, d, f, g]));

const comparePatterns = (a, b) => {
  if (a.size === b.size) {
    return true;
  }
  return false;
};

const buildRosetta = (patterns) => {
  const r = new Map();
  for (const p of patterns) {
    r.set([], p);
  }
  for (const [possibilities, key] of r.entries()) {
    for (const [number, numberPattern] of numbers.entries()) {
      if (comparePatterns(key, numberPattern)) {
        possibilities.push(number);
      }
    }
  }
  return r;
};

const getKnownPatternsFromRosetta = (r) => {
  const knownPatterns = new Set();
  for (const k of r.keys()) {
    if (k.length === 1) {
      knownPatterns.add(r.get(k));
    }
  }
  return knownPatterns;
};

const setsMatching = (setA, setB) => {
  if (setA.size != setB.size) return false;
  for (const a of setA) {
    if (!setB.has(a)) {
      return false;
    }
  }
  return true;
};

const getKnownPatterns = (patterns, knownPatterns) => {
  const matches = new Set();
  for (const p of patterns) {
    for (const k of knownPatterns) {
      if (setsMatching(p, k)) {
        matches.add(p);
      }
    }
  }
  return matches;
};

const processRow = (row) => {
  const [inputPatterns, outputPattern] = row.split("|").map((x) => {
    return x
      .trim()
      .split(" ")
      .map((x) => new Set(x.split("").sort()));
  });

  const rosetta = buildRosetta(inputPatterns);
  const uniqueSets = getKnownPatternsFromRosetta(rosetta);
  const matchingOutputs = getKnownPatterns(outputPattern, uniqueSets);
  return matchingOutputs.size;
};

let countOfNumbersWeCareAbout = 0;

for (const row of text.split("\n")) {
  countOfNumbersWeCareAbout += processRow(row);
}

console.log(countOfNumbersWeCareAbout);
