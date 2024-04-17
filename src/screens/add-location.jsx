import SearchBar from "../components/add-location/search";
import { WeatherContext } from "../context/weather-context";
import { useContext } from 'react';

const AddLocation = () => {
    const { city, setCity, lan, lon, setLat, setLon, weather, Locations, setLocations  } = useContext(WeatherContext);
    return (
        <SearchBar Locations={Locations} setLocations={setLocations} />
    );
}

export default AddLocation;