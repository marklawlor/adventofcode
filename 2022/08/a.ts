const sampleInput = `30373
25512
65332
33549
35390`;

const sampleSolution = 21;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

function answer(input = actualInput) {
  const lines = input.trim().split("\n");
  const width = lines[0].length;
  const height = lines.length;

  const coords = new Set();

  for (let row = 0; row < height; row++) {
    let max = -1;
    for (let i = 0; i < width; i++) {
      const current = Number.parseInt(lines[row][i]);

      if (current > max) {
        max = current;
        coords.add(`${row}:${i}`);
      }
    }
  }

  for (let row = 0; row < height; row++) {
    let max = -1;
    for (let i = width - 1; i > 0; i--) {
      const current = Number.parseInt(lines[row][i]);

      if (current > max) {
        max = current;
        coords.add(`${row}:${i}`);
      }
    }
  }

  for (let col = 0; col < width; col++) {
    let max = -1;
    for (let i = 0; i < height; i++) {
      const current = Number.parseInt(lines[i][col]);
      if (current > max) {
        max = current;
        coords.add(`${i}:${col}`);
      }
    }
  }

  for (let col = 0; col < width; col++) {
    let max = -1;
    for (let i = height - 1; i > 0; i--) {
      const current = Number.parseInt(lines[i][col]);
      if (current > max) {
        max = current;
        coords.add(`${i}:${col}`);
      }
    }
  }

  console.log(coords);
  console.log(coords.size);

  return coords.size;
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
