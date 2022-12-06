const sampleInput = `nppdvjthqldpwncqszvftbrmjlhg`;

const sampleSolution = 6;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  for (let i = 4; i < input.length; i++) {
    if (new Set(input.slice(i - 4, i)).size === 4) {
      return i;
    }
  }

  return 0;
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
