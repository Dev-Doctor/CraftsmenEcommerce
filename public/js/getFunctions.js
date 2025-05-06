import { BASE_URL } from "./settings";

const options = { method:"GET" }

async function skibidi() {
    const ligma = await fetch(BASE_URL + "sigma", options)
        .then(res => { //controllo chiamata
            if (res.ok)
                return res.json()
            else
                console.log("\nError: negus")
        }
        ).catch(err => console.log(err));
    return ligma;
}