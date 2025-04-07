import { pgEnum, integer, pgTable, varchar, date, primaryKey } from 'drizzle-orm/pg-core';
import { teams, opponents, players } from './players'
import { positions } from './positions';
import { timestamp } from 'drizzle-orm/gel-core';

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp(),
    deleted_at: timestamp(),
}
export const typeEnum = pgEnum('match_type',['BUCS', 'BDVA', 'Tournament', 'Other']);

export const matches = pgTable('match', {
	matchId: integer('match_id').primaryKey().generatedAlwaysAsIdentity(),
	teamId: integer('team_id').references(() => teams.teamId),
	team2Id: integer('team2_id').references(() => opponents.teamId),
	date: date('date'),
	matchType: typeEnum(),
});

export const sets = pgTable('set', {
	setId: integer('set_id').primaryKey().generatedAlwaysAsIdentity(),
	matchId: integer('match_id').references(() => matches.matchId),
	score: varchar('score', { length: 50 }),
	youtubeLink: varchar('youtube_link', { length: 255 }),
});

export const points = pgTable('point', {
	pointId: integer('point_id').generatedAlwaysAsIdentity(),
    setId: integer('set_id').references(() => sets.setId),
	teamId: integer('team_id').references(() => teams.teamId),
}, (table) => [
    primaryKey({ columns: [table.pointId, table.setId, table.teamId]})
] );

export const playerList = pgTable('player_list', {
	setId: integer('set_id').references(() => sets.setId),
	teamId: integer('team_id').references(() => teams.teamId),
	playerId: integer('player_id').references(() => players.playerId),
	positionId: integer('position_id').references(() => positions.positionId),
	shirtNumber: integer('shirt_number'),
}, (table) => [
    primaryKey({ columns: [table.setId, table.teamId]})
] );