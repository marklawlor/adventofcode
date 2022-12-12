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
    const [direction, total] = line.split(" ");

    for (let count = 0; count < Number.parseInt(total); count++) {
      switch (direction) {
        case "U": {
          positions[0][0]++;
          break;
        }
        case "D": {
          positions[0][0]--;
          break;
        }
        case "L": {
          positions[0][1]--;
          break;
        }
        case "R": {
          positions[0][1]++;
          break;
        }
      }

      for (let i = 1; i < positions.length; i++) {
        const current = positions[i];
        const previous = positions[i - 1];

        const dx = previous[0] - current[0];
        const dy = previous[1] - current[1];

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          positions[i][0] += dx === 0 ? 0 : dx / Math.abs(dx);
          positions[i][1] += dy === 0 ? 0 : dy / Math.abs(dy);
        }
      }

      tailPositions.add(positions[positions.length - 1].join(":"));
    }
  }

  return tailPositions.size;
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
