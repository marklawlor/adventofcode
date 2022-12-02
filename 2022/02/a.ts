const sampleInput = `A Y
B X
C Z`;

const sampleSolution = 15;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

const legend: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  let score = 0;

  for (const line of lines) {
    const [a, b] = line.split(/\s+/);

    const opponent = legend[a];
    const you = legend[b];

    score += you;

    if (you === opponent) {
      score += 3;
    } else if (
      you === 2 && opponent === 1 ||
      you === 3 && opponent === 2 ||
      you === 1 && opponent === 3
    ) {
      score += 6;
    }
  }

  return score;
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
