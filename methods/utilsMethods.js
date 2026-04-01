import fs from 'fs/promises'; // filestream.
import path from 'path';

/** Fetch html from filename in the directory of private/html/.
 * 
 * @async
 * @param {string} fileName - Provided file name + file extension to find file content and return it. 
 * @returns {HTMLDocument} - File's html content.
 */
export async function loadHtml(fileName) {
    const filePath = path.resolve(`private/html/${fileName}`);
    return await fs.readFile(filePath, 'utf-8');
}