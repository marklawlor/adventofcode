const sampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const sampleSolution = 45000;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  const elves = [0];

  for (const line of input.trim().split("\n")) {
    if (line === "") {
      elves.push(0);
    } else {
      elves[elves.length - 1] += Number.parseInt(line, 10);
    }
  }

  return elves.sort((a, b) => b - a).slice(0, 3).reduce(
    (acc, current) => acc + current,
    0,
  );
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
