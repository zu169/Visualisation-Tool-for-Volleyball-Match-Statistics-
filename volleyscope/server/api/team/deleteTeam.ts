import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { teams } from "~/db/schema/players";
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
      .where(eq(matches.teamId, id));
    if (playerInfo === null) {
      await db.delete(teams).where(eq(teams.teamId, id));
    } else return { message: "used in match" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return { message: "success" };
});
