import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { matches } from "~/db/schema/match";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.match);

  if (isNaN(id)) {
    return { message: "Invalid Match ID" };
  }

  try {
    const data = await db.select().from(matches).where(eq(matches.matchId, id));

    return data[0] ?? { message: "Team not found" }; // return single player
  } catch (error) {
    console.error("Error fetching player:", error);
    return { message: "error" };
  }
});
