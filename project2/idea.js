window.onload = () => { document.querySelector("#find").onclick = searchButtonClicked; };

document.querySelector("#month").value = localStorage.getItem('month');
document.querySelector("#day").value = localStorage.getItem('day');
document.querySelector("#shiny").value = localStorage.getItem('shiny');

function searchButtonClicked() {
    document.querySelector("#its").style.display = "block";

    const month = document.querySelector("#month").value;
    const day = document.querySelector("#day").value.trim();

    localStorage.setItem('month', month);
    localStorage.setItem('day', day);
    localStorage.setItem('shiny', document.querySelector("#shiny").value);

    // for debugging
    console.log("month: " + localStorage.getItem('month'));
    console.log("day: " + localStorage.getItem('day'));
    console.log("shiny: " + localStorage.getItem('shiny'));



    // Check if day is valid
    if (day === "" || isNaN(day)) {
        document.querySelector("#tempRes").textContent =
            "Not a valid number, please input a valid birth date.";
        document.querySelector("#tempRes").style.color = "red";
        document.querySelector("#its").src = "media/Empty.png";
        document.querySelector("#its").alt = "Nothing to display."
        document.querySelector("#its").style.display = "none";

        document.querySelector("#hp").textContent = "(Health)";
        document.querySelector("#atk").textContent = "(Attack)";
        document.querySelector("#df").textContent = "(Defense)";
        document.querySelector("#satk").textContent = "(Special Attack)";
        document.querySelector("#sdf").textContent = "(Special Defense)";
        document.querySelector("#sped").textContent = "(Speed)";

        return;
    }

    if (day > 31) {
        document.querySelector("#tempRes").textContent =
            "It is impossible for a month to have greater than 31 days, please select a valid birthday.";
        document.querySelector("#tempRes").style.color = "red";
        document.querySelector("#its").src = "media/Empty.png";
        document.querySelector("#its").alt = "Nothing to display."
        document.querySelector("#its").style.display = "none";


        document.querySelector("#generation").textContent = "(Generation)";
        document.querySelector("#hp").textContent = "(Health)";
        document.querySelector("#atk").textContent = "(Attack)";
        document.querySelector("#df").textContent = "(Defense)";
        document.querySelector("#satk").textContent = "(Special Attack)";
        document.querySelector("#sdf").textContent = "(Special Defense)";
        document.querySelector("#sped").textContent = "(Speed)";
        return;
    }


    // Combine month and day
    const combined = Number(month + day);

    //check for legit bdays
    if (!legitDay(combined) || day < 1) {
        document.querySelector("#tempRes").textContent =
            "Not a valid birth date, please input a valid birth date.";
        document.querySelector("#tempRes").style.color = "red";
        document.querySelector("#its").src = "media/Empty.png";
        document.querySelector("#its").alt = "Nothing to display."
        document.querySelector("#its").style.display = "none";

        document.querySelector("#hp").textContent = "(Health)";
        document.querySelector("#atk").textContent = "(Attack)";
        document.querySelector("#df").textContent = "(Defense)";
        document.querySelector("#satk").textContent = "(Special Attack)";
        document.querySelector("#sdf").textContent = "(Special Defense)";
        document.querySelector("#sped").textContent = "(Speed)";

        return;
    }

    //go to result
    document.getElementById("result").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });



    // Check if the dex goes that far
    if (combined > 1025) {
        document.querySelector("#tempRes").textContent =
            "There are no pokemon after dex #1025, you have no birthday pokemon. Try again when the next game comes out.";
        document.querySelector("#tempRes").style.color = "red";
        document.querySelector("#its").src = "media/Empty.png";
        document.querySelector("#its").style.display = "none";

        document.querySelector("#hp").textContent = "(Health)";
        document.querySelector("#atk").textContent = "(Attack)";
        document.querySelector("#df").textContent = "(Defense)";
        document.querySelector("#satk").textContent = "(Special Attack)";
        document.querySelector("#sdf").textContent = "(Special Defense)";
        document.querySelector("#sped").textContent = "(Speed)";


        return;
    }


    // Display result

    // Fetch Pokémon data from PokeAPI
    const url = `https://pokeapi.co/api/v2/pokemon/${combined}/`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found.");
            }
            return response.json();
        })
        .then(data => {
            const name = data.name; // Get Pokémon name from JSON
            const shiny = document.querySelector("#shiny").value === "yes";
            const spriteUrl = shiny ? data.sprites.front_shiny : data.sprites.front_default;

            const tempRes = document.getElementById("tempRes");
            tempRes.textContent = `Your birthday Pokémon is ${name.toUpperCase()}!`;
            tempRes.style.color = "black";
            document.querySelector("#its").src = spriteUrl;

            genFind(data.id);

            document.querySelector("#hp").textContent = "Health: " + data.stats[0].base_stat;
            document.querySelector("#atk").textContent = "Attack: " + data.stats[1].base_stat;
            document.querySelector("#df").textContent = "Defense: " + data.stats[2].base_stat;
            document.querySelector("#satk").textContent = "Special Attack: " + data.stats[3].base_stat;
            document.querySelector("#sdf").textContent = "Special Defense: " + data.stats[4].base_stat;
            document.querySelector("#sped").textContent = "Speed: " + data.stats[5].base_stat;
        })
        .catch(error => {
            const tempRes = document.getElementById("tempRes");
            tempRes.textContent = "Error: " + error.message;
            tempRes.style.color = "red";
            document.querySelector("#its").style.display = "none";
            document.querySelector("#its").src = "media/Empty.png";
            document.querySelector("#its").alt = "Nothing to display."

            document.querySelector("#hp").textContent = "(Health): ";
            document.querySelector("#atk").textContent = "(Attack): ";
            document.querySelector("#df").textContent = "(Defense): ";
            document.querySelector("#satk").textContent = "(Special Attack): ";
            document.querySelector("#sdf").textContent = "(Special Defense): ";
            document.querySelector("#sped").textContent = "(Speed): ";

        });

}

//function to test for legit dates -still feels ugly-
function legitDay(thing) {
    if ((thing > 131 && thing < 200) || (thing > 229 && thing < 300)
        //no valid days in month 1 after 1/31, no valid days in month 2 after 2/29
        || (thing > 331 && thing < 400) || (thing > 430 && thing < 500)
        //no valid days in month 3 after 3/31, no valid days in month 4 after 4/30, etc etc.
        || (thing > 531 && thing < 600) || (thing > 630 && thing < 700)
        || (thing > 731 && thing < 800) || (thing > 831 && thing < 900)
        || (thing > 930 && thing < 1000) || (thing > 1031 && thing < 1100)
        || (thing > 1130 && thing < 1200) || thing > 1231) {
        return false;
    }

    else {
        return true;
    }
}

function genFind(gen) {
    if (gen <= 151) {
        document.querySelector("#generation").textContent = "Originating from Gen I";
    }
    else if (gen <= 251) {
        document.querySelector("#generation").textContent = "Originating from Gen II";
    }
    else if (gen <= 386) {
        document.querySelector("#generation").textContent = "Originating from Gen III";
    }
    else if (gen <= 493) {
        document.querySelector("#generation").textContent = "Originating from Gen IV";
    }
    else if (gen <= 649) {
        document.querySelector("#generation").textContent = "Originating from Gen V";
    }
    else if (gen <= 721) {
        document.querySelector("#generation").textContent = "Originating from Gen VI";
    }
    else if (gen <= 809) {
        document.querySelector("#generation").textContent = "Originating from Gen VII";
    }
    else if (gen <= 905) {
        document.querySelector("#generation").textContent = "Originating from Gen VIII";
    }
    else if (gen <= 1025) {
        document.querySelector("#generation").textContent = "Originating from Gen IX";
    }

}
