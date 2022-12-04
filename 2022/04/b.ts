const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const sampleSolution = 4;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  let count = 0;

  for (const line of input.trim().split("\n")) {
    if (!line) continue;
    const [left, right] = line.split(",");
    const [leftA, leftB] = left.split("-").map((n) => Number.parseInt(n, 10));
    const [rightA, rightB] = right.split("-").map((n) =>
      Number.parseInt(n, 10)
    );

    if (leftA >= rightA && leftA <= rightB) {
      count++;
    } else if (rightA >= leftA && rightA <= leftB) {
      count++;
    }
  }
  return count;
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
