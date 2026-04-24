export function buttonState(isFollowing, isHovering) {
    if (isFollowing && isHovering) return "Stop Following";
    if (isFollowing) return "Following";
    return "Follow";
}