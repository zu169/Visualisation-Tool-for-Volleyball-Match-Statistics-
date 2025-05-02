import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { serves } from "~/db/schema/points";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const pointId = Number(query.point);

  try {
    const serve = await db
      .select()
      .from(serves)
      .where(eq(serves.pointId, pointId));

    return { data: serve, message: "success" };
  } catch (error) {
    console.log(error);
    return { data: 0, message: "error" };
  }
});
