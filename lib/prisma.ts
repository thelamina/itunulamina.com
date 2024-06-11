import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

let prisma: PrismaClient;

// Create a new instance of the libSQL database client
const libsql = createClient({
  // @ts-expect-error
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_TOKEN,
});

// Create a Prisma "adapter" for libSQL
const adapter = new PrismaLibSQL(libsql);

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter });
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  // @ts-ignore
  global["prisma"] = global["prisma"] || new PrismaClient({ adapter });
  // @ts-ignore
  prisma = global["prisma"];
}

export default prisma;
