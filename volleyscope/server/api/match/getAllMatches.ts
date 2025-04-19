import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { matches } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.team);
  try {
    if (id === 0) {
      const data = await db.select().from(matches).orderBy(matches.date);

      return data;
    }
    const data = await db
      .select()
      .from(matches)
      .orderBy(matches.date)
      .where(eq(matches.teamId, id));

    return data;
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
});
