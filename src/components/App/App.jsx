import { useState } from "react";
import { useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { APIkey, coordinates } from "../../utils/constants";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleImageCardClick = (card) => {
    console.log("card clicked", card);
    setActiveModal("preview-image");
    setSelectedCard(card);
  };

  const handleAddClothesClick = () => {
    console.log("add clothes");
    setActiveModal("add-garment");
  };

  const handleActiveModalClose = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const weatherData = filterWeatherData(data);

        setWeatherData(weatherData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClothesClick={handleAddClothesClick}
          weatherData={weatherData}
        />
        <Main
          weatherData={weatherData}
          handleImageCardClick={handleImageCardClick}
        />
      </div>
      <ModalWithForm
        buttonText="Add Garment"
        Title="New Garment"
        activeModal={activeModal}
        handleActiveModalClose={handleActiveModalClose}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imgUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imgUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type</legend>
          <label
            htmlFor="hot"
            className="modal__radio-label modal__label_type_radio"
          >
            <input
              type="radio"
              id="hot"
              name="weather"
              value="hot"
              className="modal__radio"
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__radio-label">
            <input
              type="radio"
              id="warm"
              name="weather"
              value="warm"
              className="modal__radio"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__radio-label">
            <input
              type="radio"
              id="cold"
              name="weather"
              value="cold"
              className="modal__radio"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleActiveModalClose={handleActiveModalClose}
      />
      <Footer />
    </div>
  );
}

export default App;
