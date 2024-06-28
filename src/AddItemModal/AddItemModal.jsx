import React, { useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";
import { addItem } from "../utils/api";

const AddItemModal = ({ onAddItem, handleActiveModalClose, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
      imageUrl: imageUrl,
      weatherType: weatherType,
    };
    console.log("submit", newItem);
    addItem(newItem)
      .then((item) => {
        console.log("item", item);
        onAddItem(item);
        handleActiveModalClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <ModalWithForm
      buttonText="Add Garment"
      Title="New Garment"
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
            checked={weatherType === "hot"}
            onChange={(e) => setWeatherType(e.target.value)}
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
            checked={weatherType === "warm"}
            onChange={(e) => setWeatherType(e.target.value)}
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
            checked={weatherType === "cold"}
            onChange={(e) => setWeatherType(e.target.value)}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
