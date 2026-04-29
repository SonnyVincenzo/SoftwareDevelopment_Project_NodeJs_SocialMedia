import fs from "fs/promises";
import path from "path";

export default function createSearchHandler(db) {
    return {
        async search(req, res)
        {
            const query = req.query.q;
            if(!query)
            {
                return res.redirect("/home");
            }
            try{
                //check users
                const [users] = await db.execute(
                    "SELECT username FROM User WHERE username = ?",
                    [query]
                );

                if (users.length > 0)
                {
                    return res.redirect(`/user/${query}`);
                }

                //search posts
                const [posts] = await db.execute(
                    `SELECT id, postHeader FROM Posts
                    WHERE postHeader LIKE ? OR postText LIKE ? LIMIT 10`,
                    [`%${query}%`, `%${query}%`]
                );
                //build HTML results
                let resultsHTML = ""
                if(posts.length === 0)
                {
                    resultsHTML = "<p>No result found. </p>";
                }
                else {
                    resultsHTML = posts
                    .map(post => 
                        `<a href= "/post/${post.id}">${post.postHeader}</a><br>`)
                    .join("");
                }

                let html = await fs.readFile(
                    path.resolve("templates/search.html"), "utf-8"
                );
                const result = html.replace("%%searchResult%%", resultsHTML);
                res.send(result);
            }
            catch(err)
            {
                console.error(err);
                res.status(500).send("Search failed");
            }
        }
    }
}