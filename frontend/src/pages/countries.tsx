import CountriesList from "../components/CountriesList";
import AddCountryForm from "../components/AddCountryForm";

export default function CountriesPage() {
    return (
        <div>
            <AddCountryForm />
            <CountriesList />
        </div>
    );
}