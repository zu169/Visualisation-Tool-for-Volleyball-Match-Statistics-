import { db } from "~/db/index";
import { opponents } from "~/db/schema/players";

export default defineEventHandler(async () => {
  try {
    const data = await db
      .select({ teamId: opponents.teamId, teamName: opponents.teamName })
      .from(opponents)
      .orderBy(opponents.teamName);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
});
