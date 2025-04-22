import { db } from "~/db/index";
import { players, teamPlayers, teams } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  type Player = {
    playerId: number;
    playerName: string;
    position:
      | "Setter"
      | "Outside Hitter"
      | "Middle Blocker"
      | "Opposite Hitter"
      | "Libero"
      | "Defensive Specialist"
      | "Service Specialist"
      | "Bench";
    shirtNumber: number | null;
  };

  const data = await readBody(event);
  try {
    await db
      .select({
        playerId: players.playerId,
        playerName: players.playerName,
        position: players.position,
        shirtNumber: players.shirtNumber,
      })
      .from(players)
      .orderBy(players.playerName);
  } catch (error) {
    return { message: "error" };
  }
  return data;
});
