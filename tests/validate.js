const { execSync } = require("child_process");

const checks = [
  { name: "HTML validation", cmd: "npx html-validate index.html" },
  { name: "CSS linting", cmd: 'npx stylelint "css/**/*.css"' },
];

let failed = false;

for (const check of checks) {
  process.stdout.write(`Running ${check.name}... `);
  try {
    execSync(check.cmd, { stdio: "pipe" });
    console.log("✓ passed");
  } catch (err) {
    console.log("✗ FAILED");
    console.error(err.stdout?.toString() || err.stderr?.toString());
    failed = true;
  }
}

if (failed) {
  console.log("\nSome checks failed.");
  process.exit(1);
} else {
  console.log("\nAll checks passed.");
}
