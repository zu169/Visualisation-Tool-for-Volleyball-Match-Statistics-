import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.match);
  try {
    const data = await db
      .select({ setNumber: sets.setNumber })
      .from(sets)
      .where(eq(sets.matchId, id));
    return data;
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
});
