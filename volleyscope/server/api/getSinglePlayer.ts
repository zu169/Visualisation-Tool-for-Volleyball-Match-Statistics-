import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { players } from "~/db/schema/players";
import { defineEventHandler } from "h3";

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

    return data[0] ?? { message: "Player not found" }; // return single player
  } catch (error) {
    console.error("Error fetching player:", error);
    return { message: "error" };
  }
});
