
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
export function formatPostToHtml(posts, tempSwitchEndpoint = 'user') {
    let postHtml;
    if (tempSwitchEndpoint === 'user') {
        postHtml = posts.map((post) => `
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
                    <button class="like">&#10084;</button>
                    <p class="likes" value="0"></p>
                    <button class="dislike">&#10006;</button>
                    <p class="dislikes" value="0"></p>
                </div>
            </article>`)
            .join("")
            ;
    } else if (tempSwitchEndpoint === 'home') {
        postHtml = posts.map((post) => `
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
                    <button class="like" data-user-id="" data-user-reaction="none">&#10084;</button>
                    <span class="likes" value="0">0</span>
                    <button class="dislike" data-user-id="" data-user-reaction="none">&#10006;</button>
                    <span class="dislikes" value="0">0</span>
                </div>
            </article>`)
            .join("")
            ;
    }
    return postHtml;
}