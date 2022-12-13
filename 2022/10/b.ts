const sampleInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const sampleSolution = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url)
);

function answer(input = actualInput) {
  let cpuCycle = 1;
  let cpuCycleBusy = 0;
  let xRegister = 1;

  const lines = input.trim().split("\n");

  const cycleMap: Record<number, number> = {};

  let output = "";

  while (true) {
    if (cpuCycleBusy === 0) {
      const line = lines.shift();

      if (!line) break;

      if (line.startsWith("addx")) {
        const x = Number.parseInt(line.split(" ")[1], 10);
        cpuCycleBusy = 1;
        cycleMap[cpuCycle + 1] = x;
      }
    } else {
      cpuCycleBusy--;
    }

    const xScan = (cpuCycle - 1) % 40;

    if (xScan === 0) {
      output = output + "\n";
    }

    if (
      xScan === xRegister - 1 ||
      xScan == xRegister ||
      xScan === xRegister + 1
    ) {
      output += "#";
    } else {
      output += ".";
    }

    if (cycleMap[cpuCycle]) {
      xRegister += cycleMap[cpuCycle];
    }

    cpuCycle++;
  }

  return output.trim();
}

console.log("b: ", answer(sampleInput) === sampleSolution);
console.log(answer());
