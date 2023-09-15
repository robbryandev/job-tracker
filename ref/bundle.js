/* eslint-disable */
const fs = require("fs");

const path = __dirname.replace(/\\/g, "/");
const parent = path.replace(/\/[a-z0-9_]*$/i, "");
let base = fs.readFileSync(path + "/README.md", "utf-8");
const refs = [
  { name: "architecture", arg: "arc" },
  { name: "tree", arg: "tree" },
  { name: "to-do", arg: "todo" },
];

refs.forEach((ref) => {
  const pattern = new RegExp(`\\$${ref.arg}`, "g");
  base = base.replace(
    pattern,
    fs.readFileSync(`${path}/${ref.name}.md`, "utf-8")
  );
});

fs.writeFileSync(parent + "/README.md", base);
