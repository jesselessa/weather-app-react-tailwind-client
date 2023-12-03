import { useContext } from "react";

// Context
import { CityContext } from "../contexts/cityContext.jsx";

export default function CityCard({ cityName, onRemove }) {
  const { cityData } = useContext(CityContext);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto p-4">
      <h3 className="text-center text-xl font-bold  mb-2 ">
        {cityData.name}, {cityData.sys?.country}
      </h3>

      <img
        className="w-24 mx-auto"
        src={`http://openweathermap.org/img/wn/${cityData.weather[0]?.icon}@2x.png`}
        alt="weather"
      />

      <div className="px-6 py-4 text-center">
        <p>
          <span className="text-gray-700 font-bold text-base">
            Temperature :
          </span>{" "}
          {Math.round(cityData.main?.temp)} °C <br />
          (Min : {Math.round(cityData.main?.temp_min)} ° C , Max :{" "}
          {Math.round(cityData.main?.temp_max)} °C)
        </p>
        <p>
          <span className="text-gray-700 font-bold text-base">
            Description :
          </span>{" "}
          {cityData.weather[0]?.main}
        </p>
      </div>

      <div className="flex justify-center ">
        {/*Remove Favorite */}
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          onClick={onRemove}
        >
          Remove favorite
        </button>
      </div>
    </div>
  );
}