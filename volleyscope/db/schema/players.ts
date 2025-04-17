import {
  integer,
  pgTable,
  varchar,
  decimal,
  date,
  primaryKey,
} from "drizzle-orm/pg-core";
import { positionsEnum, leaguesEnum, divisionsEnum } from "./positions";

export const teams = pgTable("team", {
  teamId: integer("team_id").primaryKey().generatedAlwaysAsIdentity(),
  teamName: varchar("team_name", { length: 100 }).notNull().unique(),
  league: leaguesEnum().notNull(),
  division: divisionsEnum().notNull(),
});

export const teamPlayers = pgTable(
  "teamPlayer",
  {
    teamId: integer("team_id").references(() => teams.teamId),
    playerId: integer("player_id").references(() => players.playerId),
    yearJoined: varchar("year_joined", { length: 4 }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.teamId, table.playerId] })]
);

export const opponents = pgTable("opponent", {
  teamId: integer("team_id").primaryKey().generatedAlwaysAsIdentity(),
  teamName: varchar("team_name", { length: 100 }).notNull().unique(),
  league: leaguesEnum().notNull(),
  division: divisionsEnum().notNull(),
});

export const players = pgTable("player", {
  playerId: integer("player_id").primaryKey().generatedAlwaysAsIdentity(),
  playerName: varchar("player_name").notNull().unique(),
  position: positionsEnum().notNull(),
  shirtNumber: integer("shirt_number"),
  birthday: date("birthday", { mode: "date" }),
  playerHeight: decimal("player_height"),
  playerWeight: decimal("player_weight"),
  jumpHeight: decimal("jump_height", { precision: 5, scale: 2 }),
  serveSpeed: decimal("serve_speed", { precision: 5, scale: 2 }),
  hittingSpeed: decimal("hitting_speed", { precision: 5, scale: 2 }),
});

// export const playerPositions = pgTable('playerPosition', {
//     playerId : integer('player_id').references(() => players.playerId),
//     positionId: integer('position_id').references(() => positions.positionId),
// })
