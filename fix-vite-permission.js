import { execSync } from "child_process";
import { existsSync } from "fs";

try {
  if (existsSync("node_modules/.bin/vite")) {
    execSync("chmod +x node_modules/.bin/vite");
    console.log("✅ Fixed Vite binary permission");
  } else {
    console.log("⚠️ vite binary not found, skipping chmod");
  }
} catch (e) {
  console.warn("⚠️ Could not fix vite binary permission:", e.message);
}
