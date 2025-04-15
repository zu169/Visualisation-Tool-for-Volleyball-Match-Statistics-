import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { players } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const id: number = getRouterParam(event, "playerId") ?? 1;
  let data = undefined;
  try {
    data = await db.select().from(players).where(eq(players.playerId, id));
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  console.log(data);
  return data;
});
