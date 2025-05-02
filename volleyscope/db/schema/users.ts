import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const potentialUsers = pgTable("potentials", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
});

