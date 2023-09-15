const { exec } = require("child_process");
const { writeFileSync } = require("fs");

const cmd = exec(`powershell -c "tree /A /F src"`);
let stdout = "";
cmd.stdout.forEach((val) => {
  stdout = stdout + val;
});

cmd.stdout.on("close", () => {
  const firstPathIndex = stdout.split("").findIndex((val) => val === "|");
  stdout = stdout.substring(firstPathIndex - 1, stdout.length);
  const output = `## Folder Structure \n\n\`\`\`\nsrc${stdout}\`\`\``;
  writeFileSync("./ref/tree.md", output);
});
