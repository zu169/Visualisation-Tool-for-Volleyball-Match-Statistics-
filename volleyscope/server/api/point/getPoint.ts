import { db } from "~/db/index";
import { and, eq } from "drizzle-orm";
import { points } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const pointNum = Number(query.point);
  const setId = Number(query.set);

  try {
    const point = await db
      .select({ pointId: points.pointId })
      .from(points)
      .where(and(eq(points.setId, setId), eq(points.pointNumber, pointNum)));

    return { data: point[0].pointId, message: "success" };
  } catch (error) {
    console.log("Error" + error);
    return { data: 0, message: "error" };
  }
});
