import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCityData } from "../utils/callAPI.js";

// Component
import CityCard from "../components/CityCard.jsx";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function Favorites() {
  const { setCityData, favoriteCities, setFavoriteCities } =
    useContext(CityContext);

  const navigate = useNavigate();

  const [favFetchedData, setFavFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // // Fetch data from localStorage on component mount
  // useEffect(() => {
  //   const storedFavorites = JSON.parse(localStorage.getItem("favoriteCities"));
  //   console.log("Stored favorites:", storedFavorites);

  //   if (storedFavorites && Array.isArray(storedFavorites)) {
  //     // Update data for every favorite city
  //     storedFavorites.forEach(async (city) => {
  //       const data = await fetchCityData(city, setCityData, setIsLoading);
  //       console.log("Data Favorites:", data);
  //       setFavFetchedData(data);
  //       setIsLoading(false);
  //     });

  //     setFavoriteCities(storedFavorites);
  //   }
  // }, [setCityData, setFavoriteCities, setIsLoading]);

  useEffect(() => {
    if (favoriteCities.length !== 0) {
      setIsLoading(true);
      fetchFavCities();
    }
  }, [favoriteCities]);

  const fetchFavCities = async () => {
    const promises = [];

    favoriteCities.forEach((city) =>
      promises.push(fetchCityData(city, setCityData))
    );

    await Promise.all(promises).then((res) => setFavFetchedData(res));
    setIsLoading(false);
  };

  // Remove favorite button
  const removeFromFavorites = (cityName) => {
    const updatedFavorites = favoriteCities.filter((city) => city !== cityName);
    setFavoriteCities(updatedFavorites);

    // Update LS after state modification
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="container mx-auto min-h-fit flex flex-col justify-around items-center p-3">
      <h2 className="text-2xl text-center font-bold mb-5">
        Your favorite cities
      </h2>

      <div className="flex flex-col lg:flex-row justify-around items-center px-2 py-3">
        {favoriteCities.length > 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-center mb-5">No favorite city added yet</p>

            <button
              type="button"
              className="w-full md:w-60 inline-flex justify-center items-center  py-2 border border-transparent rounded-md shadow-sm text-sm font-medium  text-indigo-600 bg-amber-300  hover:bg-indigo-600 hover:text-white"
              // id="buttonFavorite"
              onClick={() => navigate("/")}
            >
              Back to homepage
            </button>
          </div>
        ) : (
          <div className="py-3 flex flex-col justify-between lg:flex-row lg:justify-around lg:gap-x-8">
            {favFetchedData.map((favCityData, index) => {
              return (
                <CityCard
                  key={index}
                  id={index}
                  data={favCityData}
                  onRemove={() => removeFromFavorites(favCityData.name)}
                  showRemoveButton={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


