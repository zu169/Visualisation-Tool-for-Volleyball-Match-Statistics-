import { db } from "~/db/index";
import { sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const setId = await db.insert(sets).values(body).returning(sets.setId);

    return {
      data: setId,
      message: "success",
    };
  } catch (error) {
    console.error("Insert error:", error);
    return {
      message: "error",
    };
  }
});
