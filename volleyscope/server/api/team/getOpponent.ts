import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { opponents } from "~/db/schema/players";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.team);

  if (isNaN(id)) {
    return { message: "Invalid Player ID" };
  }

  try {
    const data = await db
      .select()
      .from(opponents)
      .where(eq(opponents.teamId, id));

    return data[0] ?? { message: "Team not found" }; // return single player
  } catch (error) {
    console.error("Error fetching player:", error);
    return { message: "error" };
  }
});
