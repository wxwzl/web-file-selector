const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();
const playgroundDist = path.join(root, "playground", "dist");
const sourceFile = path.join(root, "dist", "index.full.umd.js");
const targetFile = path.join(playgroundDist, "index.full.umd.js");

// Ensure playground/dist exists
fs.mkdirSync(playgroundDist, { recursive: true });

// Copy built UMD bundle
fs.copyFileSync(sourceFile, targetFile);

// Start live-server
execSync("npx live-server ./playground", { stdio: "inherit" });
