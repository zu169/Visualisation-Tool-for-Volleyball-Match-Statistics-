import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
// import { potentialUsers } from './schema/users';
// import { positions } from './schema/positions';

export const db = drizzle(process.env.DATABASE_URL!);

// async function main(){
//     const potentials: typeof potentialUsers.$inferInsert = {
//         name : 'Zu',
//         email: 'zuz2@aber.ac.uk',
//     };
//     if (potentialUsers == null) {
//         await db.insert(potentialUsers).values(potentials);
//         console.log('Successfully Registered Interest!')
//     }
    
//     await db.insert(positions).values([{positionName: 'Setter'}, {positionName: 'Outside Hitter'}, {positionName: 'Middle Blocker'}, {positionName: 'Opposite Hitter'}, {positionName: 'Libero'}, {positionName: 'Defensive Specialist'}, {positionName: 'Service Specialist'}])
// }

// main();