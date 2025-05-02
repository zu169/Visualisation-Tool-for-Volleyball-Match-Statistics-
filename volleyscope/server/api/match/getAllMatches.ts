import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { matches } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const teamId = Number(query.team);

  try {
    if (teamId === 0) {
      const data = await db.select().from(matches).orderBy(matches.date);

      return data;
    } else {
      const data = await db
        .select()
        .from(matches)
        .orderBy(matches.date)
        .where(eq(matches.teamId, teamId));
      return data;
    }
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
});
