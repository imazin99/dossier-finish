import bcrypt from "bcryptjs";

/**
 * Usage:
 *   npx tsx src/scripts/hashPassword.ts "your-chosen-password"
 *
 * Prints a bcrypt hash to paste into backend/.env as ADMIN_PASSWORD_HASH.
 * This script never writes to .env itself and never talks to the
 * database or the running server — it's a pure offline utility.
 */
async function main() {
  const password = process.argv[2];
  if (!password || password.trim() === "") {
    console.error('Usage: npx tsx src/scripts/hashPassword.ts "your-chosen-password"');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  console.log("\nAdd this line to backend/.env:\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
}

main();
