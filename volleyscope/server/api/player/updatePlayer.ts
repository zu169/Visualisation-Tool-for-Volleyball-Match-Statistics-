import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { players, teamPlayers } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.player);
  const body = await readBody(event);
  console.log(body);

  try {
    const { teams, yearJoined, ...playerData } = body;

    await db.update(players).set(playerData).where(eq(players.playerId, id));

    if (Array.isArray(teams)) {
      // Remove existing links
      await db.delete(teamPlayers).where(eq(teamPlayers.playerId, id));

      // Add new links
      const teamPlayerRows = teams.map((teamId: number) => ({
        playerId: id,
        teamId,
        yearJoined,
      }));

      await db.insert(teamPlayers).values(teamPlayerRows);
    }

    return { message: "success" };
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message.includes("violates not-null constraint")
    ) {
      return { message: "missing" };
    }
    return { message: "error" };
  }
});
