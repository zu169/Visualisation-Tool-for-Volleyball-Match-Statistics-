import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { matches } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.match);

  if (isNaN(id)) {
    return { message: "Invalid Team ID" };
  }
  try {
    await db.delete(matches).where(eq(matches.matchId, id));
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return { message: "success" };
});
