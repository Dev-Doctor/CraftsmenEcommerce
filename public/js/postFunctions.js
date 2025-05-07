import { BASE_URL } from "./settings.js";



async function isTokenValid(token) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
    };

    try {
        const res = await fetch(BASE_URL + "login", options);

        if (res.ok) {
            return true;
        } else {
            return false;
        }

        // if (res.status === 400) {
        //     console.log("Bad Request: Invalid token.");
        //     return null;
        // }

        // if (!res.ok) {
        //     console.log("Error: token login failed with status", res.status);
        //     return null;
        // }
    } catch (err) {
        console.err("Fetch error:", err);
        return false;
    }
}

export { isTokenValid }