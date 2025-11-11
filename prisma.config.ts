import { defineConfig, env } from "prisma/config";
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

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
