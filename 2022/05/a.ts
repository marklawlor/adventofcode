const sampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const sampleSolution = "CMZ";

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  const lines = input.split("\n").filter(Boolean);

  const columns = [];

  let line = lines.shift();

  while (!line.startsWith(" 1 ")) {
    for (let i = 1; i < line.length; i += 4) {
      if (line[i] === " ") continue;
      const index = (i - 1) / 4;
      columns[index] ??= [];
      columns[index] = [line[i], ...columns[index]];
    }
    line = lines.shift();
  }

  for (const line of lines) {
    const [, amountString, , fromString, , toString] = line.split(" ");
    const amount = Number.parseInt(amountString, 10);
    const from = Number.parseInt(fromString, 10) - 1;
    const to = Number.parseInt(toString, 10) - 1;

    const take = columns[from].splice(amount * -1);
    columns[to].push(...take.reverse());
  }

  return columns.map((col) => col.pop()).join("");
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
