export function buttonState(isFollowing, isHovering) {
    if (isFollowing && isHovering) return "Stop Following";
    if (isFollowing) return "Following";
    return "Follow";
}

if (typeof document !== 'undefined') {
    const followButton = document.getElementById("followButton");
    let following = false;

    if (followButton) {

        followButton.addEventListener("mouseClick", () => {
            following = !following;
            followButton.textContent = buttonState(following, false);
        });

        followButton.addEventListener("mouseEnter", () => {
            followButton.textContent = buttonState(following, true);
        });

        followButton.addEventListener("mouseLeave", () => {
            followButton.textContent = buttonState(following, false);
        });
    }
}