import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CountryDetail() {
    const router = useRouter();
    const { id: code } = router.query;

    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (!code) {
            return;
        }

        console.log('Fetching country with code:', code);
        fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                {
                    country(code: "${code}") {
                        id
                        name
                        code
                        emoji
                        continent {
                            name
                        }
                    }
                }
                `,
            }),
        })
            .then((response) => {
                console.log('API response:', response);
                return response.json();
            })
            .then((data) => {
                console.log('API data:', data);
                if (data && data.data) {
                    setCountry(data.data.country);
                }
            });
    }, [code]);

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <div className="country-detail">
            <h2>{country.name}</h2>
            <p>{country.code}</p>
            <p>{country.emoji}</p>
            <p>{country.continent?.name}</p>
        </div>
    );
}
