import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { listPlayer } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const playerListId = Number(query.listId);

  try {
    const playerList = await db
      .select()
      .from(listPlayer)
      .where(eq(listPlayer.playerListId, playerListId));
    return {
      data: playerList,
    };
  } catch (error) {
    console.log("Database error:", error);
    return { data: 0 };
  }
});
