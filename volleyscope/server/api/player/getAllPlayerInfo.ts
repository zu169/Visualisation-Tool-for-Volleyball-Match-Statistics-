import { db } from "~/db/index";
import { players } from "~/db/schema/players";

export default defineEventHandler(async () => {
  try {
    const data = await db
      .select({
        playerName: players.playerName,
        playerId: players.playerId,
        position: players.position,
        shirtNumber: players.shirtNumber,
      })
      .from(players)
      .orderBy(players.playerName);
    console.log("Player data:", data);
    return data;
  } catch (error) {
    console.error("Database error:", error);
    return { message: "error" };
  }
});
