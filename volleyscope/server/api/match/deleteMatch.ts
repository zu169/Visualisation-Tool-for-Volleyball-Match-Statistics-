import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { matches, sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.match);

  if (isNaN(id)) {
    return { message: "Invalid Team ID" };
  }
  try {
    const sets = await db
      .select({ setId: sets.setId })
      .from(sets)
      .where(eq(sets.matchId, id));

    console.log("Sets: ", sets);
    if (sets !== undefined) {
      sets.forEach(async (set) => {
        await db.delete(sets).where(eq(sets.setId, set.setId));
      });
    }
    await db.delete(matches).where(eq(matches.matchId, id));
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return { message: "success" };
});
