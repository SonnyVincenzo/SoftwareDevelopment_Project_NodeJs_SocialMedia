export async function getLoggedInUser() {
    const res = await fetch("/user/me");

    if(!res.ok)
    {
        return null;
    }
    return await res.json();
}
