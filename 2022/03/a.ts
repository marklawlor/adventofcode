const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const sampleSolution = 157;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  let sum = 0;

  for (const line of input.split("\n")) {
    const left = new Set(line.slice(0, line.length / 2).split(""));
    const right = new Set(line.slice(line.length / 2).split(""));

    for (const item of left) {
      if (right.has(item)) {
        if (item === item.toLowerCase()) {
          sum += item.charCodeAt(0) - 96;
        } else {
          sum += (item.charCodeAt(0) - 64) + 26;
        }
      }
    }
  }
  7903;
  return sum;
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
