import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", //사용할 db 종류
  schema: "./db/schema.ts", //스키마
  out:"./drizzle",
  dbCredentials : {
    url:process.env.DATABASE_URL!
  }
});
 