import { db } from "~/db/index";
import { and, eq } from "drizzle-orm";
import { sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const matchId = Number(query.match);
  const setNum = Number(query.set);
  const body = await readBody(event);

  try {
    // Attempt to update the record
    const result = await db
      .update(sets)
      .set(body)
      .where(and(eq(sets.matchId, matchId), eq(sets.setNumber, setNum)));

    if (result.rowCount === 0) {
      // If no rows were updated, attempt to insert the record
      await db.insert(sets).values(body);
    }

    return {
      message: "success",
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      message: "Database operation failed",
      error: error,
    };
  }
});
