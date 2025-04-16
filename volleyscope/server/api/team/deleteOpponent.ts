import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { opponents } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.team);

  if (isNaN(id)) {
    return { message: "Invalid Team ID" };
  }
  try {
    await db.delete(opponents).where(eq(opponents.teamId, id));
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
  return { message: "success" };
});
