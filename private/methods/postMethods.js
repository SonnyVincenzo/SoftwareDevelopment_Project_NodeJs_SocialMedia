
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
export async function formatPostToHtml(db, posts, tempSwitchEndpoint = 'user') {
    let postHtml = "";

    for (const post of posts) {
        const [rows] = await db.execute(
            "SELECT type FROM userLikesDislikes WHERE id = ?",
            [post.id]
        );
        const likeCount = rows.filter(res => res.type === "like").length || 0;
        const dislikeCount = rows.filter(res => res.type === "dislike").length || 0;

        if (tempSwitchEndpoint === 'user') {
            postHtml += `
                <article class="post">
                    <h2 class="title">
                        ${replaceDangerousChars(post.postHeader)}
                    </h2>
                    <p class="by-line">
                        By: 
                        <a class="by-line" href="/user/${encodeURIComponent(post.username)}">
                            ${replaceDangerousChars(post.username)}
                        </a>
                    </p>
                    <p class="text">${replaceDangerousChars(post.postText)}</p>
                    <div class="post-icons">
                        <button class="like" data-post-id="${post.id}">&#10084;</button>
                        <p class="likes" value="${likeCount}">${likeCount}</p>
                        <button class="dislike" data-post-id="${post.id}">&#10006;</button>
                        <p class="dislikes" value="${dislikeCount}">${dislikeCount}</p>
                    </div>
                </article>`
            ;
        } else if (tempSwitchEndpoint === 'home') {
            postHtml += `
                <article class="post">
                    <p class="title"> ${replaceDangerousChars(post.postHeader)} 
                    </p>
                    <p class="by-line"> By:
                        <a class="by-line" href="/user/${encodeURIComponent(post.username)}">
                            ${encodeURIComponent(post.username)}
                        </a>
                    </p>
                    <p class="text">
                        ${replaceDangerousChars(post.postText)}
                    </p>
                    <div class="post-icons">
                        <button class="like" data-post-id="${post.id}" data-user-reaction="none">&#10084;</button>
                        <span class="likes" value="${likeCount}">${likeCount}</span>
                        <button class="dislike" data-post-id="${post.id}" data-user-reaction="none">&#10006;</button>
                        <span class="dislikes" value="${dislikeCount}">${likeCount}</span>
                    </div>
                </article>`
            ;
        }
    }
    return postHtml;
}