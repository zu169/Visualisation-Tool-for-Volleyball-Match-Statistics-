import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const positions = pgTable('position', {
	positionId: integer('position_id').primaryKey().generatedAlwaysAsIdentity(),
	positionName: varchar('position_name', { length: 100 }).notNull(),
});

