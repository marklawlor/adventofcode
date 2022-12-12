const sampleInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const sampleSolution = 36;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  const tailPositions = new Set(["0:0"]);

  const positions = Array(10)
    .fill(0)
    .map(() => [0, 0]);

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
      for (let j = 0; j < positions.length; j++) {
        if (j === 0) {
          positions[j][0] += modX;
          positions[j][1] += modY;
        } else {
          const current = positions[j];
          const previous = positions[j - 1];

          if (Math.abs(previous[0] - current[0]) >= 2) {
            const direction = previous[0] - current[0];
            current[0] += direction > 0 ? 1 : -1;

            if (previous[1] !== current[1]) {
              current[1] += previous[1] - current[1];
            }
          }

          if (Math.abs(previous[1] - current[1]) >= 2) {
            const direction = previous[1] - current[1];
            current[1] += direction > 0 ? 1 : -1;

            if (previous[0] !== current[0]) {
              current[0] += previous[0] - current[0];
            }
          }
        }
      }

      tailPositions.add(positions[9].join(":"));
    }
  }

  console.log(tailPositions);
  console.log(tailPositions.size);

  return tailPositions.size;
}

console.log("a: ", answer(sampleInput) === sampleSolution, answer());
