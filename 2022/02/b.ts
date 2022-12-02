const sampleInput = `A Y
B X
C Z`;

const sampleSolution = 12;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

const legend: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
};

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  let score = 0;

  for (const line of lines) {
    const [a, b] = line.split(/\s+/);

    const opponent = legend[a];
    const you = b;

    if (you === "Y") {
      score += 3;
      score += opponent;
    } else if (you === "X") {
      score += (opponent - 1) === 0 ? 3 : (opponent - 1);
    } else {
      score += (opponent + 1) % 3;
      score += 6;
    }
  }

  return score;
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
