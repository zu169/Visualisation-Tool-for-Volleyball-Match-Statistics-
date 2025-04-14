import { db } from '~/db/index';
import { players } from '~/db/schema/players';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body);
    try{
        await db.insert(players).values(body);
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
    return { message: 'success' };
});