import { db } from "~/db/index";
import { sets } from "~/db/schema/match";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    await db.insert(sets).values(body);

    return {
      message: "success",
    };
  } catch (error) {
    console.error("Insert error:", error);
    return {
      message: "error",
    };
  }
});
