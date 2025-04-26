import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { points } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const setId = Number(query.set);

  try {
    const setPoints = await db
      .select()
      .from(points)
      .where(eq(points.setId, setId))
      .orderBy(points.pointNumber);

    console.log("points", setPoints);
    return setPoints;
  } catch (error) {
    console.log("Error" + error);
    return { data: [] };
  }
});
