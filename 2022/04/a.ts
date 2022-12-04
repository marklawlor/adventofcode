const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const sampleSolution = 2;

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

    if (
      leftB - leftA <= rightB - rightA && leftA >= rightA && leftB <= rightB
    ) {
      count++;
    } else if (
      rightB - rightA <= leftB - leftA && rightA >= leftA && rightB <= leftB
    ) {
      count++;
    }
  }
  return count;
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
