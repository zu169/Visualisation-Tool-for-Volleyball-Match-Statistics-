import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { players, teamPlayers } from "~/db/schema/players";
import { listPlayer } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.player);

  try {
    // First, delete team-player links for this player
    const inMatch = db
      .select()
      .from(listPlayer)
      .where(eq(listPlayer.playerId, id));
    if (inMatch.playerId === id) {
      return { message: "used in match" };
    } else {
      // Then delete the player record itself
      await db.delete(players).where(eq(players.playerId, id));
      await db.delete(teamPlayers).where(eq(teamPlayers.playerId, id));
      return { message: "success" };
    }
  } catch (error) {
    console.error("Delete error:", error);
    return { message: "error" };
  }
});
