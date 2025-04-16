import { db } from "~/db/index";
import { opponents } from "~/db/schema/players";

export default defineEventHandler(async () => {
  let data = undefined;
  try {
    data = await db.select().from(opponents).orderBy(opponents.teamName);
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return data;
});
