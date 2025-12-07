import { defineConfig } from "prisma/config";
import { config as loadEnv } from "dotenv";
import dotenvExpand from "dotenv-expand";
import { existsSync } from "node:fs";
import path from "node:path";

const envFileCandidates = [
  process.env.PRISMA_ENV_FILE,
  `.env.${process.env.NODE_ENV ?? "development"}`,
  ".env",
].filter(Boolean) as string[];

for (const file of envFileCandidates) {
  const absolutePath = path.resolve(process.cwd(), file);
  if (!existsSync(absolutePath)) continue;

  const parsed = loadEnv({ path: absolutePath, override: true });
  dotenvExpand.expand(parsed);
  break;
}

// For prisma generate, DATABASE_URL is not required
// Only needed for migrations and runtime operations
// Use a dummy URL during generation if DATABASE_URL is not available
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  // During prisma generate, we don't need a real connection
  // This dummy URL is only used for config validation
  return "postgresql://user:password@localhost:5432/dummy";
};

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: getDatabaseUrl(),
  },
});
