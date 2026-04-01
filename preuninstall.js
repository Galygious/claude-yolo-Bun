#!/usr/bin/env bun

/**
 * Preuninstall script for claude-yolo-extended
 * Cleans up modified CLI files before package removal
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Cleaning up claude-yolo-extended files...');

// Files to clean up in each location
const filesToClean = ['cli-yolo.js', 'cli-yolo.mjs', '.claude-yolo-extended-consent'];

async function cleanup() {
  const localDir = path.join(__dirname, 'node_modules', '@anthropic-ai', 'claude-code');

  if (!fs.existsSync(localDir)) {
    console.log('No files needed cleanup');
    return;
  }

  let totalCleaned = 0;

  for (const file of filesToClean) {
    const filePath = path.join(localDir, file);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`  Removed: ${filePath}`);
        totalCleaned++;
      }
    } catch (err) {
      console.error(`  Could not remove ${filePath}: ${err.message}`);
    }
  }

  if (totalCleaned > 0) {
    console.log(`Cleanup complete: removed ${totalCleaned} file(s)`);
  } else {
    console.log('No files needed cleanup');
  }
}

cleanup().catch((err) => {
  console.error(`Cleanup failed: ${err.message}`);
});
