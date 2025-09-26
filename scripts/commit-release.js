#!/usr/bin/env node
/**
 * Commit release version & changelog.
 * 1. Ensures CHANGELOG.md is tracked.
 * 2. Commits version bump and changelog with a conventional commit message.
 */
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const process = require('node:process');

const pkgPath = './packages/cursor-with/package.json';
const version = require('../packages/cursor-with/package.json').version;

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

try {
  if (fs.existsSync('CHANGELOG.md')) {
    run('git add CHANGELOG.md');
  }
  run(`git add ${pkgPath}`);
  run(`git commit -m "build(release): v${version}"`);
  console.warn(`Committed release: v${version}`);
}
catch (err) {
  console.error(err.message);
  process.exit(1);
}
