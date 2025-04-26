import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { serves } from "~/db/schema/points";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const serveData = { ...body };

    const serve = await db
      .insert(serves)
      .values(serveData)
      .returning({ serveId: serves.serveId });

    if (serve) {
      await db
        .update(serves)
        .set(serveData)
        .where(eq(serves.serveId, serve.serveId));
    }
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
});
