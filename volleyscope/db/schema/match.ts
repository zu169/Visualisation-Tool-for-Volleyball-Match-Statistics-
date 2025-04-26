import {
  integer,
  pgTable,
  varchar,
  date,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { teams, opponents, players } from "./players";
import { positionsEnum, leaguesEnum } from "./positions";

export const sideEnum = pgEnum("sides", ["home", "away"]);

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

export const sets = pgTable("set", {
  setId: integer("set_id").primaryKey().generatedAlwaysAsIdentity(),
  matchId: integer("match_id").references(() => matches.matchId),
  setNumber: integer("set_number").notNull(),
  teamScore: integer("team_score").notNull(),
  opponentScore: integer("opponent_score").notNull(),
  playerListId: integer("player_list_id").references(
    () => playerList.playerListId
  ),
  youtubeLink: varchar("youtube_link", { length: 255 }).unique(),
});

export const points = pgTable("point", {
  pointId: integer("point_id").primaryKey().generatedAlwaysAsIdentity(),
  setId: integer("set_id").references(() => sets.setId),
  pointNumber: integer("point_number").unique().notNull(),
  side: sideEnum().notNull(),
  playerListId: integer("player_list_id").references(
    () => playerList.playerListId
  ),
});

export const playerList = pgTable("player_list", {
  playerListId: integer("player_list_id")
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  setNum: integer("set_num").notNull(),
  matchId: integer("match_id").references(() => matches.matchId),
});

export const listPlayer = pgTable(
  "list_player",
  {
    playerListId: integer("player_list_id").references(
      () => playerList.playerListId
    ),
    playerId: integer("player_id").references(() => players.playerId),
    position: positionsEnum().notNull(),
    shirtNumber: integer("shirt_number"),
  },
  (table) => [primaryKey({ columns: [table.playerListId, table.playerId] })]
);
