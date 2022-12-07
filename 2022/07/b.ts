const sampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const sampleSolution = 24933642;

const actualInput = await Deno.readTextFile(
  new URL("./input.txt", import.meta.url),
);

function answer(input = actualInput) {
  const lines = input.trim().split("\n");

  const sizes = new Map();
  let path = ["/"];

  for (const line of lines) {
    if (line === "$ cd /") {
      path = ["/"];
    } else if (line === "$ cd .." && path.length > 1) {
      path.pop();
    } else if (line.startsWith("$ cd")) {
      path.push(line.split("$ cd ")[1]);
    } else if (line === "$ ls") {
      // ignore
    } else if (line.startsWith("dir")) {
      // ignore
    } else {
      const [size] = line.split(" ");

      for (let i = path.length; i !== 0; i--) {
        const currentPath = path.slice(0, i).join("/").replace("//", "/");
        const currentSize = sizes.get(currentPath) ?? 0;
        sizes.set(currentPath, currentSize + Number.parseInt(size));
      }
    }
  }

  const used = 70000000 - sizes.get("/") ?? 0;
  const requiredSpace = 30000000 - used;

  return [...sizes.entries()]
    .filter(([_, value]) => {
      return value >= requiredSpace;
    })
    .sort((a, b) => {
      return a[1] - b[1];
    })[0][1];
}

console.log("b: ", answer(sampleInput) === sampleSolution, answer());
