const {crawlPage} = require("./crawl.js");


async function main() {
  const argl = process.argv.length;
  if (argl < 3) {
    console.error("Missing argument: url");
    process.exit(1);
  }
  if (argl > 3) {
    console.error("Too many arguments");
    process.exit(1);
  }

  const baseUrl = process.argv[2];
  console.log(`Starting crawling from '${baseUrl}'...`);

  let visited = new Map();
  await crawlPage(baseUrl, baseUrl, visited);
  console.log(visited);
}

main();
