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

        document.querySelector("#hp").textContent = "(Health): ";
        document.querySelector("#atk").textContent = "(Attack): ";
        document.querySelector("#df").textContent = "(Defense): ";
        document.querySelector("#satk").textContent = "(Special Attack): ";
        document.querySelector("#sdf").textContent = "(Special Defense): ";
        document.querySelector("#sped").textContent = "(Speed): ";

        return;
    }

    if (day > 31) {
        document.querySelector("#tempRes").textContent =
            "It is impossible for a month to have greater than 31 days, please select a valid birthday.";
        document.querySelector("#tempRes").style.color = "red";
        document.querySelector("#its").src = "media/Empty.png";
        document.querySelector("#its").alt = "Nothing to display."
        document.querySelector("#its").style.display = "none";

        document.querySelector("#hp").textContent = "(Health): ";
        document.querySelector("#atk").textContent = "(Attack): ";
        document.querySelector("#df").textContent = "(Defense): ";
        document.querySelector("#satk").textContent = "(Special Attack): ";
        document.querySelector("#sdf").textContent = "(Special Defense): ";
        document.querySelector("#sped").textContent = "(Speed): ";
        return;
    }


    // Combine month and day
    const combined = Number(month + day);

    //check for legit bdays
    if ((combined > 131 && combined < 200) || (combined > 229 && combined < 300)
        || (combined > 331 && combined < 400) || (combined > 430 && combined < 500)
        || (combined > 531 && combined < 600) || (combined > 630 && combined < 700)
        || (combined > 731 && combined < 800) || (combined > 831 && combined < 900)
        || (combined > 930 && combined < 1000) || (combined > 1031 && combined < 1100)
        || (combined > 1130 && combined < 1200) || combined > 1231) {
        document.querySelector("#tempRes").textContent =
            "Not a valid birth date, please input a valid birth date.";
        document.querySelector("#tempRes").style.color = "red";
        document.querySelector("#its").src = "media/Empty.png";
        document.querySelector("#its").alt = "Nothing to display."
        document.querySelector("#its").style.display = "none";

        document.querySelector("#hp").textContent = "(Health): ";
        document.querySelector("#atk").textContent = "(Attack): ";
        document.querySelector("#df").textContent = "(Defense): ";
        document.querySelector("#satk").textContent = "(Special Attack): ";
        document.querySelector("#sdf").textContent = "(Special Defense): ";
        document.querySelector("#sped").textContent = "(Speed): ";

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
            "There are no pokemon after dex #1025, you have no birthday pokemon.";
        document.querySelector("#tempRes").style.color = "red";
        document.querySelector("#its").src = "media/Empty.png";
        document.querySelector("#its").style.display = "none";

        document.querySelector("#hp").textContent = "(Health): ";
        document.querySelector("#atk").textContent = "(Attack): ";
        document.querySelector("#df").textContent = "(Defense): ";
        document.querySelector("#satk").textContent = "(Special Attack): ";
        document.querySelector("#sdf").textContent = "(Special Defense): ";
        document.querySelector("#sped").textContent = "(Speed): ";


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

            if (data.id <= 151) {
                document.querySelector("#generation").textContent = "Originating from gen I";
            }
            else if (data.id <= 251) {
                document.querySelector("#generation").textContent = "Originating from gen II";
            }
            else if (data.id <= 386) {
                document.querySelector("#generation").textContent = "Originating from gen III";
            }
            else if (data.id <= 493) {
                document.querySelector("#generation").textContent = "Originating from gen IV";
            }
            else if (data.id <= 649) {
                document.querySelector("#generation").textContent = "Originating from gen V";
            }
            else if (data.id <= 721) {
                document.querySelector("#generation").textContent = "Originating from gen VI";
            }
            else if (data.id <= 809) {
                document.querySelector("#generation").textContent = "Originating from gen VII";
            }
            else if (data.id <= 905) {
                document.querySelector("#generation").textContent = "Originating from gen VIII";
            }
            else if (data.id <= 1025) {
                document.querySelector("#generation").textContent = "Originating from gen IX";
            }

            document.querySelector("#hp").textContent = "(Health): " + data.stats[0].base_stat;
            document.querySelector("#atk").textContent = "(Attack): " + data.stats[1].base_stat;
            document.querySelector("#df").textContent = "(Defense): " + data.stats[2].base_stat;
            document.querySelector("#satk").textContent = "(Special Attack): " + data.stats[3].base_stat;
            document.querySelector("#sdf").textContent = "(Special Defense): " + data.stats[4].base_stat;
            document.querySelector("#sped").textContent = "(Speed): " + data.stats[5].base_stat;
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
