import { db } from "~/db/index";
import { points } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const pointNum = Number(query.point);
  const listId = Number(query.list);
  const setId = Number(query.set);

  try {
    const point = await db
      .insert(points)
      .values({ playerListId: listId, setId: setId, pointNumber: pointNum })
      .returning({ pointId: points.pointId });

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
