import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { addItem } from "../utils/api";

const AddItemModal = ({ onAddItem, handleActiveModalClose, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    };
    addItem(newItem)
      .then((item) => {
        onAddItem(item);
        setName("");
        setImageUrl("");
        setWeather("");
        handleActiveModalClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New Garment"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="imgUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imgUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
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
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
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
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
