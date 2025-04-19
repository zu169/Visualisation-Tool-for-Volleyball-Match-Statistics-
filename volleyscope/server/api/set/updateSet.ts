import { db } from "~/db/index";
import { and, eq } from "drizzle-orm";
import { sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const matchId = Number(query.match);
  const setId = Number(query.set);
  const body = await readBody(event);

  try {
    await db
      .update(sets)
      .set(body)
      .where(and(eq(sets.matchId, matchId), eq(sets.setId, setId)));
    return {
      message: "success",
    };
  } catch (error) {
    console.error("Update error:", error);
    return {
      message: "error",
    };
  }
});
