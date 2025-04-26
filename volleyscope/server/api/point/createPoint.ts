import { db } from "~/db/index";
import { points } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const pointNum = Number(query.point);
  const listId = Number(query.list);
  const setId = Number(query.set);
  const side = String(query.side);

  try {
    const point = await db
      .insert(points)
      .values({
        setId: setId,
        pointNumber: pointNum,
        side: side,
        playerListId: listId,
      })
      .returning({ pointId: points.pointId });

    console.log(point[0].pointId);
    return {
      data: point[0]?.pointId,
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      data: 0,
      message: "error",
    };
  }
});
