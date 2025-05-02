import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  teams,
  opponents,
  players,
  teamPlayers,
  matches,
  playerList,
  listPlayer,
  sets,
  points,
  serves,
  attacks,
  receives,
  set_actions,
  blocks,
} from "./schema/";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

async function seed() {
  // 1. Teams and Opponents
  const [team1, team2] = await db
    .insert(teams)
    .values([
      { teamName: "Volleyball United", league: "BUCS", division: "Premier" },
      { teamName: "Net Ninjas", league: "NVL", division: "1" },
    ])
    .returning();

  const [opponent1, opponent2] = await db
    .insert(opponents)
    .values([
      { teamName: "Block Masters", league: "BUCS", division: "1" },
      { teamName: "Spike Force", league: "NVL", division: "2" },
    ])
    .returning();

  // 2. Players
  const playerData = [
    { playerName: "Alice", position: "Setter", shirtNumber: 1 },
    { playerName: "Bob", position: "Outside Hitter", shirtNumber: 2 },
    { playerName: "Charlie", position: "Middle Blocker", shirtNumber: 3 },
    { playerName: "Diana", position: "Libero", shirtNumber: 4 },
    { playerName: "Ethan", position: "Opposite Hitter", shirtNumber: 5 },
    { playerName: "Fiona", position: "Setter", shirtNumber: 6 },
    { playerName: "George", position: "Middle Blocker", shirtNumber: 7 },
    { playerName: "Hannah", position: "Outside Hitter", shirtNumber: 8 },
    { playerName: "Isaac", position: "Service Specialist", shirtNumber: 9 },
    { playerName: "Julia", position: "Defensive Specialist", shirtNumber: 10 },
  ];
  const insertedPlayers = await db
    .insert(players)
    .values(playerData)
    .returning();

  // 3. Assign players to team1
  await db.insert(teamPlayers).values(
    insertedPlayers.map((p) => ({
      teamId: team1.teamId,
      playerId: p.playerId,
      yearJoined: "2024",
    }))
  );

  // 4. Matches
  const matchData = [
    {
      teamId: team1.teamId,
      opponentId: opponent1.teamId,
      date: new Date("2024-11-01"),
      matchType: "BUCS",
    },
    {
      teamId: team1.teamId,
      opponentId: opponent2.teamId,
      date: new Date("2024-12-01"),
      matchType: "NVL",
    },
    {
      teamId: team2.teamId,
      opponentId: opponent1.teamId,
      date: new Date("2025-01-01"),
      matchType: "NVL",
    },
  ];
  const insertedMatches = await db
    .insert(matches)
    .values(matchData)
    .returning();

  for (const [i, match] of insertedMatches.entries()) {
    // 5. Player List per Match
    const [plist] = await db
      .insert(playerList)
      .values({
        matchId: match.matchId,
        setNum: 1,
      })
      .returning();

    // 6. Link players to list
    const matchPlayers = insertedPlayers.slice(0, 6); // First 6 players per match
    await db.insert(listPlayer).values(
      matchPlayers.map((p) => ({
        playerListId: plist.playerListId,
        playerId: p.playerId,
        position: p.position,
        shirtNumber: p.shirtNumber ?? null,
      }))
    );

    // 7. Create a Set
    const [set1] = await db
      .insert(sets)
      .values({
        matchId: match.matchId,
        setNumber: 1,
        teamScore: 25,
        opponentScore: 22,
        playerListId: plist.playerListId,
        youtubeLink: `https://youtube.com/watch?v=match${i + 1}`,
      })
      .returning();

    // 8. Create a Point
    const [point1] = await db
      .insert(points)
      .values({
        setId: set1.setId,
        pointNumber: 1 + i,
        side: "home",
        playerListId: plist.playerListId,
      })
      .returning();

    const player = matchPlayers[i % matchPlayers.length];

    // 9. Populate serve/attack/receive/set/block
    await db.insert(serves).values({
      pointId: point1.pointId,
      playerId: player.playerId,
      type: "Float",
      success: "Ace",
    });

    await db.insert(attacks).values({
      pointId: point1.pointId,
      playerId: player.playerId,
      type: "Hit",
      success: "Kill",
    });

    await db.insert(receives).values({
      pointId: point1.pointId,
      playerId: player.playerId,
      type: "Dig",
      success: "3",
    });

    await db.insert(set_actions).values({
      pointId: point1.pointId,
      playerId: player.playerId,
      type: "Assist",
    });

    await db.insert(blocks).values({
      pointId: point1.pointId,
      playerId: player.playerId,
      type: "Touch",
    });
  }

  console.log(" Seed complete with 10 players and 3 matches");
  process.exit(0);
}

seed().catch((err) => {
  console.error(" Seeding failed:", err);
  process.exit(1);
});
