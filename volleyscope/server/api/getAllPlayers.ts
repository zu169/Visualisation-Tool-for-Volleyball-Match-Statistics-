import { db } from "~/db/index";
import { players } from "~/db/schema/players";

export default defineEventHandler(async () => {
  let data = undefined;
  try {
    data = await db.select().from(players).orderBy(players.playerName);
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return data;
});
