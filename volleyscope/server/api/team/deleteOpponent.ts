import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { opponents } from "~/db/schema/players";
import { matches } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.team);

  if (isNaN(id)) {
    return { message: "Invalid Team ID" };
  }   
  try {
    const playerInfo = await db
      .select()
      .from(matches)
      .where(eq(matches.opponentId, id));

    if (playerInfo === null) {
      await db.delete(opponents).where(eq(opponents.teamId, id));
    } else return { message: "used in match" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return { message: "success" };
});
