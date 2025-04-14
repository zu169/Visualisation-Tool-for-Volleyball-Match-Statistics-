import { db } from '~/db/index';
import { players } from '~/db/schema/players';

// get everything from players table

export default defineEventHandler(async (event) => {
    const allPlayers = await db.select().from(players);
    allPlayers.map((player) => {
        // @ts-ignore 
        player.age = player.birthday ? new Date().getFullYear() - player.birthday.getFullYear() : 0
    })
    return allPlayers;
});