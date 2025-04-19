import { pgEnum } from "drizzle-orm/pg-core";

export const positionsEnum = pgEnum("positions", [
  "Setter",
  "Outside Hitter",
  "Middle Blocker",
  "Opposite Hitter",
  "Libero",
  "Defensive Specialist",
  "Service Specialist",
  "Bench",
]);

export const leaguesEnum = pgEnum("leagues", [
  "BUCS",
  "BDVA",
  "NVL",
  "Regional",
  "Tournament",
  "Other",
]);

export const divisionsEnum = pgEnum("divisions", ["Premier", "1", "2", "3"]);
