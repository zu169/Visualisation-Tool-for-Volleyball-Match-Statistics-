import { db } from "~/db/index";
import { opponents } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  try {
    await db.insert(opponents).values(body);
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
