const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

const sampleSolution = 70;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  let sum = 0;

  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i = i + 3) {
    for (const n of lines[i].split("")) {
      if (lines[i + 1].includes(n) && lines[i + 2].includes(n)) {
        if (n === n.toLowerCase()) {
          sum += n.charCodeAt(0) - 96;
        } else {
          sum += (n.charCodeAt(0) - 64) + 26;
        }
        break;
      }
    }
  }

  return sum;
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
