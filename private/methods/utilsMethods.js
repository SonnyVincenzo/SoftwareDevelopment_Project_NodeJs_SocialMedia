import fs from 'fs/promises'; // filestream.
import path from 'path';

/** Fetch html from filename in the directory of private/html/.
 * 
 * @async
 * @param {string} fileName - Provided file name + file extension to find file content and return it. 
 * @returns {HTMLDocument} - File's html content.
 */
export async function loadHtml(fileName) {
    const filePath = path.resolve(`private/templates/${fileName}`);
    return await fs.readFile(filePath, 'utf-8');
}

/**
 * Replacing potentially dangerous chars with their HTML escape code/value.
 * 
 * @param {String} value 
 * @returns Parsed string.
 */
export function replaceDangerousChars(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

/** Helper function to template login button or user already logged in button for redirection to user.
 * 
 * @param {string} username - Username of the logged in user.
 * @returns HTML of logged in or not outcome.
 */
export function templateLoggedInUser(username) {
    let html = '';

    html = !username ? '<a class="username-button solo" href="/auth/login">Login</a>'
        : `
        <a class="aButton username-button" href="/user/${encodeURIComponent(username)}">${replaceDangerousChars(username)}</a>
        <a class="profile" href="/user/${encodeURIComponent(username)}"></a>
        `
    ;

    return html;
}

/** Helper function to enfore a login popup prompt.
 * 
 * @returns 
 */
export function templateUnloggedUser() {
    let html = '';
    html = `
        <dialogue id="login-popup">
            <section>
                <h2>You need to be logged in!</h2>
                <span>To do additional actions.</span>
                <nav>
                    <a href="/auth/login">Login</a>
                    <a href="/auth/signup">Sign up</a>
                </nav>
                <button class="aButton" id="login-popup-close">Close</button>
            </section>
        </dialogue>
        `
    ;
    return html;
}