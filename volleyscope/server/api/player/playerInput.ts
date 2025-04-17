import { db } from "~/db/index";
import { players, teamPlayers } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const { teams, yearJoined, ...playerData } = body;

    const insertedPlayer = await db
      .insert(players)
      .values(playerData)
      .returning({ playerId: players.playerId });

    const newPlayerId = insertedPlayer[0]?.playerId;

    if (!newPlayerId) {
      return { message: "error", detail: "Failed to retrieve new playerId" };
    }

    if (Array.isArray(teams)) {
      const teamPlayerRows = teams.map((teamId: number) => ({
        teamId,
        playerId: newPlayerId,
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
