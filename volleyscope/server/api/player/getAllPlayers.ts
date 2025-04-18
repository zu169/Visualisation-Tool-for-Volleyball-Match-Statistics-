import { db } from "~/db/index";
import { eq } from "drizzle-orm";
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
    birthday: Date;
    playerHeight: number | null;
    playerWeight: number | null;
    jumpHeight: number | null;
    serveSpeed: number | null;
    hittingSpeed: number | null;
  };

  type PlayerResponse = {
    player: Player;
    teamInfo: {
      teamId: number;
      yearJoined: string;
      teamName: string;
    }[];
    message?: string;
  };

  const query = getQuery(event);
  const id = Number(query.team);
  console.log("Team ID:", id);

  try {
    const baseQuery = db
      .select({
        player: players,
        teamInfo: {
          teamId: teamPlayers.teamId,
          yearJoined: teamPlayers.yearJoined,
          teamName: teams.teamName,
        },
      })
      .from(players)
      .leftJoin(teamPlayers, eq(players.playerId, teamPlayers.playerId))
      .leftJoin(teams, eq(teamPlayers.teamId, teams.teamId))
      .orderBy(players.playerName);

    const data =
      id !== 0
        ? await baseQuery.where(eq(teamPlayers.teamId, id))
        : await baseQuery;

    const groupedData: Record<number, PlayerResponse> = {};

    for (const row of data) {
      const player = row.player;
      const info = row.teamInfo;

      if (!groupedData[player.playerId]) {
        groupedData[player.playerId] = {
          player,
          teamInfo: [],
        };
      }

      if (info?.teamId != null) {
        groupedData[player.playerId].teamInfo.push(info);
      }
    }

    console.log(groupedData);
    return Object.values(groupedData);
  } catch (error) {
    console.error("Database error:", error);
    return { message: "error" };
  }
});
