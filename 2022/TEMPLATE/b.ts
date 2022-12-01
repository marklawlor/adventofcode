const sampleInput = ``;

const sampleSolution = 0;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  return false;
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
