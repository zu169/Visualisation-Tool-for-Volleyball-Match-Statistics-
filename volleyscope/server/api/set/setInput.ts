import { db } from "~/db/index";
import { sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const body = await readBody(event);
  console.log(body);

  try {
    const id = await db
      .insert(sets)
      .values(body)
      .returning({ insertedId: sets.matchId });

    console.log(id);
    return {
      message: "success",
    };
  } catch (error) {
    console.error("Insert error:", error);
    return {
      message: "error",
    };
  }
});
