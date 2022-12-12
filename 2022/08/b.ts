const sampleInput = `30373
25512
65332
33549
35390`;

const sampleSolution = 8;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  const scores = new Set<number>();

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      // Left
      let scoreLeft = 0;
      for (let k = x - 1; k >= 0; k--) {
        const current = Number.parseInt(lines[y][k]);
        scoreLeft++;

        if (current >= Number.parseInt(lines[y][x])) {
          break;
        }
      }

      // Right
      let scoreRight = 0;
      for (let k = x + 1; k < lines[0].length; k++) {
        const current = Number.parseInt(lines[y][k]);
        scoreRight++;

        if (current >= Number.parseInt(lines[y][x])) {
          break;
        }
      }

      // Up
      let scoreUp = 0;
      for (let k = y - 1; k >= 0; k--) {
        const current = Number.parseInt(lines[k][x]);
        scoreUp++;

        if (current >= Number.parseInt(lines[y][x])) {
          break;
        }
      }

      // Down
      let scoreDown = 0;
      for (let k = y + 1; k < lines.length; k++) {
        const current = Number.parseInt(lines[k][x]);
        scoreDown++;

        if (current >= Number.parseInt(lines[y][x])) {
          break;
        }
      }

      const score = scoreLeft * scoreRight * scoreUp * scoreDown;

      scores.add(score);
    }
  }

  // console.log(111, scores, Math.max(...scores));

  return Math.max(...scores);
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
