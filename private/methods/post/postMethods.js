
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

/**
 * Singular entry point to format post db content into template.
 * 
 * @param {Object} posts - Posts content from backend. 
 * @param {string} [tempSwitchEndpoint='user'] - Temporary endpoint switcher for depending home or user.
 * @returns 
 */
export async function formatPostToHtml(db, posts, currUser, tempSwitchEndpoint = 'user') {
    let postHtml = "";
    
    
    for (const post of posts) {
        const [[reactions]] = await db.execute(
            `SELECT 
             COUNT(CASE WHEN type = 'like' THEN 1 END) AS likes,
             COUNT(CASE WHEN type = 'dislike' THEN 1 END) AS dislikes
             FROM userLikesDislikes WHERE id = ?`,
            [post.id]
        );
        
        const likeCount = reactions.likes || 0;
        const dislikeCount = reactions.dislikes|| 0;
        
        let userReaction = "none" ;
        if (currUser) {
            const [userReactions] = await db.execute(
                "SELECT type FROM userLikesDislikes WHERE id = ? AND username = ?",
                [post.id, currUser]
            );
            userReaction = userReactions.length > 0 ? userReactions[0].type : "none" ;
        }
        
        postHtml += 
        `<article class="post" data-user-reaction="${userReaction}">
                <p class="title"> ${replaceDangerousChars(post.postHeader)} 
                </p>
                <div class="post-info">
                    <p class="by-line"> By:
                        <a class="by-line" href="/user/${encodeURIComponent(post.username)}">
                            ${replaceDangerousChars(post.username)}
                        </a>
                    </p>
                    <p class="by-line">${new Date(post.postDate).toLocaleDateString()}
                    </p>
                </div>
                <p class="text">${replaceDangerousChars(post.postText)}</p>
                <div class="post-icons">
                    <button class="like" data-post-id="${post.id}" data-user-reaction="${userReaction}">&#10084;</button>
                    <span class="likes" value="${likeCount}">${likeCount}</span>
                    <button class="dislike" data-post-id="${post.id}" data-user-reaction="${userReaction}">&#10006;</button>
                    <span class="dislikes" value="${dislikeCount}">${dislikeCount}</span>
                    <a class="edit" href="/post?id=${post.id}">&#x26DB; </a>
                </div>
            </article>`
        ;
        
    }
    return postHtml;
}