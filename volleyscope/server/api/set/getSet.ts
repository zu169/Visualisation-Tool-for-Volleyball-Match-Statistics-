import { db } from "~/db/index";
import { and, eq } from "drizzle-orm";
import { sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const matchId = Number(query.match);
  const setNum = Number(query.set);

  if (isNaN(matchId || setNum)) {
    return { message: "Invalid Match ID" };
  }

  try {
    const data = await db
      .select()
      .from(sets)
      .where(and(eq(sets.matchId, matchId), eq(sets.setNumber, setNum)));

    return data[0] ?? { message: "Match not found" }; // return single player
  } catch (error) {
    console.error("Error fetching match:", error);
    return { message: "error" };
  }
});
