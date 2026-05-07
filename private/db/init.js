import fs from 'fs/promises'; //Loads SQL files as text
import path from 'path'; // Sets up file path for files

export default async function initializeDatabase(db) {
    try {
        const basePath = path.resolve('private/db/sql');

        // Order matters, cuz of FKs
        const files = [
            'table.user.sql',
            'table.posts.sql',
            'table.comments.sql',
            'table.likesDislikes.sql'
        ];

        for (const file of files) {
            const filePath = path.join(basePath, file);
            const sql = await fs.readFile(filePath, 'utf-8');

            await db.query(sql);

            console.log(`Executed ${file}`);
        }

        console.log("Database initialized from SQL files");
    } catch (err) {
        console.error("Database initilization failed:", err);
        throw err;
    }
}