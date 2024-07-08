import CountriesList from "../components/CountriesList";
import AddCountryForm from "../components/AddCountryForm";

export default function Home() {
  return (
    <div className="app-container">
      <AddCountryForm />
      <CountriesList />
    </div>
  );
}