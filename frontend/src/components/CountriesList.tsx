import { useEffect, useState } from "react";
import Link from 'next/link';

export default function CountriesList() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                {
                    countries {
                        id
                        name
                        emoji
                        code
                    }
                }
                `,
            }),
        })
            .then((response) => response.json())
            .then((data) => setCountries(data.data.countries));
    }, []);

    return (
        <div className="countries-list">
            {countries.map((country) => (
                <div className="country" key={country.id}>
                    <Link href={`/countries/${country.code}`}>
                        <div>
                            <h2>{country.name}</h2>
                            <p>{country.emoji}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
