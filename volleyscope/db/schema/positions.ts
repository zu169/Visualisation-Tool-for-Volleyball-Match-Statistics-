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
