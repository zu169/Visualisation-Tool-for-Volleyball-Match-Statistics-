import { db } from "~/db/index";
import { and, eq } from "drizzle-orm";
import { points } from "~/db/schema/match";
import { serves } from "~/db/schema/points";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const pointNum = Number(query.point);
  const setId = Number(query.set);

  try {
    // 1. Get the correct point
    const point = await db
      .select({ pointId: points.pointId })
      .from(points)
      .where(and(eq(points.setId, setId), eq(points.pointNumber, pointNum)))
      .then((rows) => rows[0]); // <--- fix: take first row

    if (!point) {
      return { message: "Point not found" };
    }

    // 2. Delete dependent serves first
    await db.delete(serves).where(eq(serves.pointId, point.pointId));

    // 3. Then delete the point itself
    await db
      .delete(points)
      .where(eq(points.pointId, point.pointId)) // <--- use pointId directly
      .returning({ pointId: points.pointId });

    return { message: "success" };
  } catch (error) {
    console.error(error);
    return { message: "error", error };
  }
});
