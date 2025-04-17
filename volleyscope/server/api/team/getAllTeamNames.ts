import { db } from "~/db/index";
import { teams } from "~/db/schema/players";

export default defineEventHandler(async () => {
  let data = undefined;
  try {
    data = await db
      .select({ teamId: teams.teamId, teamName: teams.teamName })
      .from(teams)
      .orderBy(teams.teamName);
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return data;
});
