import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { players, teamPlayers } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.player);

  try {
    // First, delete team-player links for this player
    await db.delete(teamPlayers).where(eq(teamPlayers.playerId, id));

    // Then delete the player record itself
    await db.delete(players).where(eq(players.playerId, id));

    return { message: "success" };
  } catch (error) {
    console.error("Delete error:", error);
    return { message: "error" };
  }
});
