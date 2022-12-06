const sampleInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

const sampleSolution = 19;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  for (let i = 0; i < input.length; i++) {
    if (new Set(input.slice(i - 14, i)).size === 14) {
      return i;
    }
  }

  return 0;
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
