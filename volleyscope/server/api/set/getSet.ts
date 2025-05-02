import { db } from "~/db/index";
import { and, eq } from "drizzle-orm";
import { sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const matchId = Number(query.match);
  const setNum = Number(query.set);

  console.log("Match ID: ", matchId);
  console.log("Set Number: ", setNum);

  if (isNaN(matchId) || isNaN(setNum)) {
    return { message: "Invalid Match ID" };
  }

  try {
    const data = await db
      .select()
      .from(sets)
      .where(and(eq(sets.matchId, matchId), eq(sets.setNumber, setNum)));

    console.log("Set Info ", data);
    // Add a pending field to the response
    return data[0] ?? { message: "Set not found", pending: false }; // return single set
  } catch (error) {
    console.error("Error fetching match:", error);
    return {
      message: "error",
      pending: false, // Ensure pending is false even in case of an error
    };
  }
});
