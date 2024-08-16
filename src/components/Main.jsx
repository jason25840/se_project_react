import "../blocks/Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  handleImageCardClick,
  clothingItems,
  onLikeClick,
  currentUser,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.type} weather,{" "}
          {weatherData.temp[currentTemperatureUnit]}&deg;{" "}
          {currentTemperatureUnit}. / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onImageCardClick={handleImageCardClick}
                  onLikeClick={onLikeClick}
                  currentUser={currentUser}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
