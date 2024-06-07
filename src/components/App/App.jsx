import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");

  const handleAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClothesClick={handleAddClothesClick} />
        <Main weatherData={weatherData} />
      </div>
      <ModalWithForm
        buttonText="Add Garment"
        Title="New Garment"
        activeModal={activeModal}
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
    </div>
  );
}

export default App;
