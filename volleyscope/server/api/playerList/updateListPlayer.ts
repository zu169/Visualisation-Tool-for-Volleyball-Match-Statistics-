import { db } from "~/db/index";
import { and, eq } from "drizzle-orm";
import { listPlayer } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const playerListId = Number(query.listId);
  const body = await readBody(event);

  try {
    await db
      .update(listPlayer)
      .set(body)
      .where(
        and(
          eq(listPlayer.playerListId, playerListId),
          eq(listPlayer.playerId, body.playerId)
        )
      );
    return {
      message: "success",
    };
  } catch (error) {
    console.error("Insert error:", error);
    return {
      message: "error",
    };
  }
});
