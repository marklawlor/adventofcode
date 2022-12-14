const sampleInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const sampleSolution = 93;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  const rocks = new Set();

  let lowestPoint = 0;

  while (lines.length) {
    const parts = lines.shift()!.split(" -> ");

    for (let i = 0; i < parts.length - 1; i++) {
      const current = parts[i].split(",").map((n) => Number.parseInt(n));
      const end = parts[i + 1].split(",").map((n) => Number.parseInt(n));

      while (current[0] !== end[0] || current[1] !== end[1]) {
        if (current[1] > lowestPoint) {
          lowestPoint = current[1];
        }

        rocks.add(current.join(","));

        if (end[0] !== current[0]) {
          current[0] += end[0] > current[0] ? 1 : -1;
        }

        if (end[1] !== current[1]) {
          current[1] += end[1] > current[1] ? 1 : -1;
        }
      }

      if (end[1] > lowestPoint) {
        lowestPoint = end[1];
      }

      rocks.add(end.join(","));
    }
  }

  lowestPoint = 2 + lowestPoint;

  let x = 0;
  let y = 0;
  let count = 0;

  while (!rocks.has("500,0")) {
    x = 500;
    y = 0;

    while (true) {
      if (!rocks.has(`${x},${y + 1}`)) {
        y += 1;
      } else if (!rocks.has(`${x - 1},${y + 1}`)) {
        y += 1;
        x -= 1;
      } else if (!rocks.has(`${x + 1},${y + 1}`)) {
        y += 1;
        x += 1;
      } else {
        count++;
        rocks.add(`${x},${y}`);
        break;
      }

      if (y + 1 === lowestPoint) {
        count++;
        rocks.add(`${x},${y}`);
        break;
      }
    }
  }

  return count;
}

console.log(
  "a: ",
  // answer(sampleInput),
  answer(sampleInput) === sampleSolution,
  answer()
);
