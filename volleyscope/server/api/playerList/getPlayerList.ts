import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { listPlayer } from "~/db/schema/match";
import { players } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const playerListId = Number(query.listId);
  try {
    const playerList = await db
      .select({
        playerId: listPlayer.playerId,
        playerName: players.playerName,
        position: listPlayer.position,
        shirtNumber: listPlayer.shirtNumber,
      })
      .from(listPlayer)
      .where(eq(listPlayer.playerListId, playerListId))
      .leftJoin(players, eq(listPlayer.playerId, players.playerId))
      .orderBy(listPlayer.position);
    return playerList;
  } catch (error) {
    console.log("Database error:", error);
    return { data: 0 };
  }
});
