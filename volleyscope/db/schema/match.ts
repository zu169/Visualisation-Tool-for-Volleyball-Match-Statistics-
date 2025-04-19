import {
  pgEnum,
  integer,
  pgTable,
  varchar,
  date,
  primaryKey,
} from "drizzle-orm/pg-core";
import { teams, opponents, players } from "./players";
import { leaguesEnum } from "./positions";

export const matches = pgTable("match", {
  matchId: integer("match_id").primaryKey().generatedAlwaysAsIdentity(),
  teamId: integer("team_id")
    .references(() => teams.teamId)
    .notNull(),
  opponentId: integer("opponent_id")
    .references(() => opponents.teamId)
    .notNull(),
  date: date("date").notNull(),
  matchType: leaguesEnum().notNull(),
});

export const sets = pgTable(
  "set",
  {
    setId: integer("set_id").notNull(),
    matchId: integer("match_id").references(() => matches.matchId),
    teamScore: integer("team_score").notNull(),
    opponentScore: integer("opponent_score").notNull(),
    youtubeLink: varchar("youtube_link", { length: 255 }).unique(),
  },
  (table) => [
    primaryKey({ name: "set_match_id", columns: [table.matchId, table.setId] }),
  ]
);

// export const points = pgTable('point', {
// 	pointId: integer('point_id').generatedAlwaysAsIdentity(),
//     setId: integer('set_id').references(() => sets.setId),
// 	teamId: integer('team_id').references(() => teams.teamId),
// }, (table) => [
//     primaryKey({ columns: [table.pointId, table.setId, table.teamId]})
// ] );

// export const playerList = pgTable('player_list', {
// 	setId: integer('set_id').references(() => sets.setId),
// 	teamId: integer('team_id').references(() => teams.teamId),
// 	playerId: integer('player_id').references(() => players.playerId),
// 	positionId: integer('position_id').references(() => positions.positionId),
// 	shirtNumber: integer('shirt_number'),
// }, (table) => [
//     primaryKey({ columns: [table.setId, table.teamId]})
// ] );
