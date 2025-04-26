import { pgEnum, integer, pgTable } from "drizzle-orm/pg-core";
import { points } from "./match";
import { players } from "./players";

export const serveTypeEnum = pgEnum("serve_type", [
  "Underhand",
  "Overhand",
  "Float",
  "Jump",
]);
export const serveSuccessEnum = pgEnum("serve_success", [
  "Normal",
  "Ace",
  "Error",
]);
export const attackTypeEnum = pgEnum("attack_type", ["Hit", "Tip"]);
export const attackSuccessEnum = pgEnum("attack_success", [
  "Normal",
  "Kill",
  "Error",
  "Blocked",
]);
export const receiveTypeEnum = pgEnum("receive_type", [
  "Normal",
  "Serve",
  "Dig",
  "Error",
]);
export const receiveSuccessEnum = pgEnum("receive_success", [
  "0",
  "1",
  "2",
  "3",
  "4",
]);
export const setTypeEnum = pgEnum("set_action_type", [
  "Assist",
  "Error",
  "Negative",
]);
export const blockTypeEnum = pgEnum("block_type", ["Kill", "Touch", "Error"]);

export const serves = pgTable("serve", {
  serveId: integer("serve_id").primaryKey().generatedAlwaysAsIdentity(),
  pointId: integer("point_id").references(() => points.pointId),
  playerId: integer("player_id").references(() => players.playerId),
  type: serveTypeEnum().default("Overhand"),
  success: serveSuccessEnum().default("Normal"),
});

export const attacks = pgTable("attack", {
  attackId: integer("attack_id").primaryKey().generatedAlwaysAsIdentity(),
  pointId: integer("point_id").references(() => points.pointId),
  playerId: integer("player_id").references(() => players.playerId),
  type: attackTypeEnum().default("Hit"),
  success: attackSuccessEnum().default("Normal"),
});

export const receives = pgTable("receive", {
  receiveId: integer("receive_id").primaryKey().generatedAlwaysAsIdentity(),
  pointId: integer("point_id").references(() => points.pointId),
  playerId: integer("player_id").references(() => players.playerId),
  type: receiveTypeEnum().default("Normal"),
  success: receiveSuccessEnum().default("2"),
});

export const set_actions = pgTable("set_action", {
  setId: integer("set_id").primaryKey().generatedAlwaysAsIdentity(),
  pointId: integer("point_id").references(() => points.pointId),
  playerId: integer("player_id").references(() => players.playerId),
  type: setTypeEnum().default("Assist"),
});

export const blocks = pgTable("block", {
  blockId: integer("block_id").primaryKey().generatedAlwaysAsIdentity(),
  pointId: integer("point_id").references(() => points.pointId),
  playerId: integer("player_id").references(() => players.playerId),
  type: blockTypeEnum().default("Touch"),
});
