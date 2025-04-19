import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { matches } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.match);
  const body = await readBody(event);
  console.log(body);

  try {
    await db.update(matches).set(body).where(eq(matches.matchId, id));

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
