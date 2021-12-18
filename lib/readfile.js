const fs = require("fs");
const readline = require("readline");
const path = require("path");

async function* readFile(filepath, transform = (x) => x) {
  const fileStream = fs.createReadStream(path.join(process.cwd(), filepath));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const data of rl) {
    yield transform(data);
  }
}

module.exports = readFile;
