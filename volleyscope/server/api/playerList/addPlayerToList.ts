import { db } from "~/db/index";
import { listPlayer } from "~/db/schema/match";

type Position =
  | "Setter"
  | "Outside Hitter"
  | "Middle Blocker"
  | "Opposite Hitter"
  | "Libero"
  | "Defensive Specialist"
  | "Service Specialist"
  | "Bench";

type ListPlayer = {
  playerListId: number;
  playerId: number;
  position: Position;
  shirtNumber: number;
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const listId = Number(query.listId);
  const body = await readBody(event);
  console.log("Received Body:", body);

  try {
    const playerInput: ListPlayer = {
      playerListId: listId,
      playerId: body.playerId,
      position: body.position as Position,
      shirtNumber: body.shirtNumber,
    };
    console.log("Player Input:", playerInput);

    await db.insert(listPlayer).values(playerInput);

    return {
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
});
