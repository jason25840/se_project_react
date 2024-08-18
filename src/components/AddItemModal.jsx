import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = ({ handleAddItem, handleActiveModalClose, isOpen }) => {
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

    handleAddItem(newItem)
      .then(() => {
        setName("");
        setImageUrl("");
        setWeather("");
        handleActiveModalClose();
      })
      .catch(console.error);
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

        <div className="radio__group">
          <input
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            className="modal__radio"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label htmlFor="hot" className="modal__radio-label">
            Hot
          </label>
        </div>

        <div className="radio__group">
          <input
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            className="modal__radio"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label htmlFor="warm" className="modal__radio-label">
            Warm
          </label>
        </div>

        <div className="radio__group">
          <input
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            className="modal__radio"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label htmlFor="cold" className="modal__radio-label">
            Cold
          </label>
        </div>
      </fieldset>
      <button className="modal__submit-btn">Add garment</button>
    </ModalWithForm>
  );
};

export default AddItemModal;
