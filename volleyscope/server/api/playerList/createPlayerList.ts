import { db } from "~/db/index";
import { and, eq } from "drizzle-orm";
import { playerList } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const matchId = Number(query.match);
  const setNum = Number(query.set);

  try {
    const existing = await db
      .select()
      .from(playerList)
      .where(
        and(eq(playerList.matchId, matchId), eq(playerList.setNum, setNum))
      );

    if (existing.length > 0) {
      // If exists, return the existing playerListId
      return {
        data: existing[0].playerListId,
        message: "error",
      };
    }

    const insertedPlayerList = await db
      .insert(playerList)
      .values({ matchId, setNum })
      .returning({ playerListId: playerList.playerListId });

    const playerListId = insertedPlayerList[0]?.playerListId;
    console.log("Inserted Player List ID:", playerListId);

    return {
      data: playerListId,
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      data: 0,
      message: "error",
    };
  }
});
