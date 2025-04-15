import { db } from "~/db/index";
import { potentialUsers } from "~/db/schema/users";

export default defineEventHandler(async (event) => {
  const { name, email } = await readBody(event);
  if (!name || !email) {
    return { message: "error" };
  }
  try {
    await db.insert(potentialUsers).values({ name, email });
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message.includes("duplicate key value")
    ) {
      return { message: "duplicate" };
    }
    return { message: "error" };
  }

  console.log(name, email);
  return { message: "success" };
});
