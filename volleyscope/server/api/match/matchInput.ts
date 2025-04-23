import { db } from "~/db/index";
import { matches } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const insertedMatch = await db
      .insert(matches)
      .values(body)
      .returning({ matchId: matches.matchId });

    const newMatchId = insertedMatch[0]?.matchId;
    return {
      status: 200,
      data: newMatchId,
      message: "Match inserted successfully",
    };
  } catch (error) {
    console.error("Insert error:", error);
    return {
      status: 400,
      data: 0,
      message: "error",
    };
  }
});
