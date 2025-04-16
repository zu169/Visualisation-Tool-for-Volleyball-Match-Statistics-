import { db } from "~/db/index";
import { teams } from "~/db/schema/players";

export default defineEventHandler(async () => {
  let data = undefined;
  try {
    data = await db.select().from(teams).orderBy(teams.teamName);
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return data;
});
