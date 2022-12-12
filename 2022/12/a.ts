const sampleInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const sampleSolution = 31;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  const grid: number[][] = [];

  const paths: Array<{ x: number; y: number; count: number }> = [];

  let endX = 0;
  let endY = 0;

  for (const [y, line] of lines.entries()) {
    grid.push([]);
    for (const [x, char] of line.split("").entries()) {
      if (char === "S") {
        paths.push({
          x,
          y,
          count: 0,
        });
        grid[y].push(0);
      } else if (char === "E") {
        endX = x;
        endY = y;
        grid[y].push(26);
      } else {
        grid[y].push(char.charCodeAt(0) - "a".charCodeAt(0) + 1);
      }
    }
  }

  const visited = new Set<string>([`${paths[0].x}:${paths[0].y}`]);

  while (paths.length) {
    const path = paths.sort((a, b) => b.count - a.count).pop()!;

    const current = grid[path.y][path.x];

    const neighbours = [
      {
        x: path.x,
        y: path.y - 1,
      },
      {
        x: path.x,
        y: path.y + 1,
      },
      {
        x: path.x - 1,
        y: path.y,
      },
      {
        x: path.x + 1,
        y: path.y,
      },
    ];

    for (const { x, y } of neighbours) {
      if (
        x < 0 ||
        y < 0 ||
        x >= grid[0].length ||
        y >= grid.length ||
        visited.has(`${x}:${y}`)
      ) {
        continue;
      }

      const next = grid[y][x];

      if (next > current && next - current !== 1) {
        continue;
      }

      if (endX === x && endY === y) {
        return path.count + 1;
      }

      paths.push({ x, y, count: path.count + 1 });
      visited.add(`${x}:${y}`);
    }
  }
}

console.log(
  "a: ",
  answer(sampleInput),
  answer(sampleInput) === sampleSolution,
  answer()
);
