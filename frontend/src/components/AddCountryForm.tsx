import { useState } from "react";

export default function AddCountryForm({ onAdd = () => { } }) {
    const [newCountry, setNewCountry] = useState({ name: "", code: "", emoji: "", continent: "" });

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                mutation {
                    addCountry(data: {name: "${newCountry.name}", code: "${newCountry.code}", emoji: "${newCountry.emoji}", continent: ${newCountry.continent}}) {
                        id
                        name
                        code
                        emoji
                        continent {
                            id
                            name
                        }
                    }
                }
                `,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.errors);
                onAdd(data.data && data.data.addCountry);
            });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                className="input"
                value={newCountry.name}
                onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
                placeholder="Name"
            />
            <input
                className="input"
                value={newCountry.code}
                onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value })}
                placeholder="Code"
            />
            <input
                className="input"
                value={newCountry.emoji}
                onChange={(e) => setNewCountry({ ...newCountry, emoji: e.target.value })}
                placeholder="Emoji"
            />
            <input
                className="input"
                value={newCountry.continent}
                onChange={(e) => setNewCountry({ ...newCountry, continent: e.target.value })}
                placeholder="Continent ID"
            />
            <button className="button" type="submit">Add country</button>
        </form>
    );
}
