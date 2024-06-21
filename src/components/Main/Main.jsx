import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter } from "react-router-dom";

function Main({ weatherData, handleImageCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <BrowserRouter>
      <main>
        <WeatherCard weatherData={weatherData} />
        <section className="cards">
          <p className="cards__text">
            Today is {weatherData.type} weather,{" "}
            {weatherData.temp[currentTemperatureUnit]}&deg;{" "}
            {currentTemperatureUnit}. / You may want to wear:
          </p>
          <ul className="cards__list">
            {defaultClothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onImageCardClick={handleImageCardClick}
                  />
                );
              })}
          </ul>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default Main;
