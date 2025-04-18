import { db } from "~/db/index";
import { eq } from "drizzle-orm";
import { players, teamPlayers, teams } from "~/db/schema/players";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = Number(query.team);
  console.log(id);
  try {
    if (id != 0) {
      const data = await db
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
        .where(eq(teamPlayers.teamId, id))
        .leftJoin(teams, eq(teamPlayers.teamId, teams.teamId))
        .orderBy(players.playerName);

      console.log(data);
      return data;
    }
    const data = await db
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

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
});
