const sampleInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const sampleSolution = 13;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  const tailPositions = new Set(["0:0"]);

  let headX = 0;
  let headY = 0;

  let tailX = 0;
  let tailY = 0;

  for (const line of lines) {
    const [direction, countString] = line.split(" ");

    let modX = 0;
    let modY = 0;

    switch (direction) {
      case "U": {
        modY = 1;
        break;
      }
      case "D": {
        modY = -1;

        break;
      }
      case "L": {
        modX = -1;
        break;
      }
      case "R": {
        modX = 1;
        break;
      }
    }

    for (let i = 0; i < Number.parseInt(countString); i++) {
      headX += modX;
      headY += modY;

      if (Math.abs(headX - tailX) >= 2) {
        tailX += modX;

        if (headY !== tailY) {
          tailY += headY - tailY;
        }
      }

      if (Math.abs(headY - tailY) >= 2) {
        tailY += modY;

        if (headX !== tailX) {
          tailX += headX - tailX;
        }
      }

      tailPositions.add(`${tailX}:${tailY}`);

      console.log(line, `${headX}:${headY}`, `${tailX}:${tailY}`);
    }
  }

  console.log(tailPositions.size);

  console.log(tailPositions);

  return tailPositions.size;
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
