const sampleInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

const sampleSolution = 10605;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

interface Monkey {
  items: number[];
  worryMod: number | string;
  worryOp: string;
  test: number;
  true: number;
  false: number;
}

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  const monkeys: Monkey[] = [];
  const monkeyBusinessCount: number[] = [];

  while (lines.length) {
    lines.shift(); // Number
    const items = lines
      .shift()!
      .split(":")[1]
      .split(",")
      .map((n) => Number.parseInt(n, 10));

    const [worryMod, worryOp] = lines.shift()!.split(" ").reverse();

    const test = lines.shift()!.split(" ").pop()!;
    const trueValue = lines.shift()!.split(" ").pop()!;
    const falseValue = lines.shift()!.split(" ").pop()!;

    lines.shift(); // blank line

    monkeys.push({
      items,
      worryOp: worryOp.trim(),
      worryMod: worryMod === "old" ? "old" : Number.parseInt(worryMod),
      test: Number.parseInt(test),
      true: Number.parseInt(trueValue),
      false: Number.parseInt(falseValue),
    });
    monkeyBusinessCount.push(0);
  }

  for (let i = 0; i < 20; i++) {
    for (const [index, monkey] of monkeys.entries()) {
      while (monkey.items.length) {
        monkeyBusinessCount[index] = monkeyBusinessCount[index] + 1;

        let worry = monkey.items.shift()!;

        const mod =
          typeof monkey.worryMod === "string" ? worry : monkey.worryMod;

        if (monkey.worryOp === "+") {
          worry += mod;
        } else {
          worry *= mod;
        }

        worry = Math.floor(worry / 3);

        if (worry % monkey.test === 0) {
          monkeys[monkey.true].items.push(worry);
        } else {
          monkeys[monkey.false].items.push(worry);
        }
      }
    }
  }

  const max = monkeyBusinessCount.sort((a, b) => a - b);

  console.log(max);

  return max.pop()! * max.pop()!;
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
