import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { potentialUsers } from './schema/users';

const db = drizzle(process.env.DATABASE_URL!);

async function main(){
    const potentials: typeof potentialUsers.$inferInsert = {
        name : 'Zu',
        email: 'zuz2@aber.ac.uk',
    };

    await db.insert(potentialUsers).values(potentials);
    console.log('Successfully Registered Interest!')

}

main();