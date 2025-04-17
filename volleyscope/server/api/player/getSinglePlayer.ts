import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { players, teamPlayers } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.player);

  if (isNaN(id)) {
    return { message: "Invalid Player ID" };
  }

  try {
    const data = await db
      .select()
      .from(players)
      .where(eq(players.playerId, id));

      if (!data[0]) {
        return { message: "Player not found" };
      }
    
    const teamInfo = await db
      .select({
        teamId: teamPlayers.teamId,
        yearJoined: teamPlayers.yearJoined,
      })
      .from(teamPlayers)
      .where(eq(teamPlayers.playerId, id));

    return {
      player: data[0],
      teamInfo,
      message: "success"
    };
  } catch (error) {
    console.error("Error fetching player:", error);
    return { message: "error" };
  }
});
