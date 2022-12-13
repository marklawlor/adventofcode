const sampleInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const sampleSolution = 13;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

type NumArray = (number | NumArray)[] | number;

function compare(left: NumArray, right: NumArray): number {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  } else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const result = compare(left[i], right[i]);

      if (result !== 0) {
        return result;
      }
    }

    return left.length - right.length;
  } else {
    return Array.isArray(left)
      ? compare(left, [right])
      : compare([left], right);
  }
}

function answer(input = actualInput) {
  const lines = input.trim().split("\n\n");

  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const [left, right] = lines[i].split("\n");

    if (compare(eval(left), eval(right)) < 0) {
      count += i + 1;
    }
  }

  return count;
}

console.log(
  "a: ",
  answer(sampleInput),
  answer(sampleInput) === sampleSolution,
  answer()
);
