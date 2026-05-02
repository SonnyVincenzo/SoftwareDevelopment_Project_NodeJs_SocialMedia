import{ loadHtml } from "../methods/utilsMethods.js"
import { sendWebResponse } from "../methods/responseMethods.js"

export default function createSearchHandler(db) {
    return async function search(req, res) {
        const query = req.query.q || "";
        if(!query || query.trim() === "")
        {
            const html = await loadHtml("search.html");
            const result = html.replace(
                "%%searchResult%%",
                "<p>Please enter a search term.</p>"
            );

            return sendWebResponse(res, 200, "text/html", result);
        }
        try{
            //check users only if query is not empty
            let users = [];
            if(query.trim() !== "") {
                [users] = await db.execute(
                    "SELECT username FROM User WHERE username = ?",
                    [query]
                );

                if (users.length > 0) {
                    return res.redirect(`/user/${query}`);
                }
            }

            //search post 
            const [posts] = await db.execute(
                `SELECT id, postHeader FROM Posts
                WHERE postHeader LIKE ? OR postText LIKE ? LIMIT 10`,
                [`%${query}%`, `%${query}%`]
            );

            //build HTML results
            let resultsHTML = "";

            if(posts.length === 0) {
                resultsHTML = "<p>No result found.</p>";
            }
            else {
                resultsHTML = posts
                .map(post => 
                    `<a href= "/post?id=${post.id}">${post.postHeader}</a><br>`)
                .join("");
            }

            let html = await loadHtml("search.html");
            const result = html.replace("%%searchResult%%", resultsHTML);

            return sendWebResponse(res, 200, "text/html", result);
        }
        catch(err)
        {
            console.error(err);
            return sendWebResponse(res, 500, "text/plain", "Search failed");
        }
    }
}