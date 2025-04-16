import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { teams } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.team);
  const body = await readBody(event);
  console.log(body);
  try {
    await db.update(teams).set(body).where(eq(teams.teamId, id));
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message.includes("violates not-null constraint")
    ) {
      return { message: "missing" };
    }
    return { message: "error" };
  }
  return { message: "success" };
});
