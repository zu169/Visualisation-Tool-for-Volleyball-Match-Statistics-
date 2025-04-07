import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { players } from './players' 

export const potentialUsers = pgTable("potentials", {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const orgUsers = pgTable('org_user', {
	orgId: integer('org_id').primaryKey().generatedAlwaysAsIdentity(),
	username: varchar('username', { length: 255 }).unique().notNull(),
	password: varchar('password', { length: 255 }).notNull(),
});

export const users = pgTable('user', {
	userId: integer('user_id').primaryKey().generatedAlwaysAsIdentity(),
	playerId: integer('player_id').unique().references(() => players.playerId),
	username: varchar('username', { length: 255 }).unique().notNull(),
	password: varchar('password', { length: 255 }).notNull(),
});



