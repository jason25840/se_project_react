import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { APIkey, coordinates } from "../../utils/constants";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../../AddItemModal/AddItemModal";
import { getItems, deleteItem } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [ClothingItems, setClothingItems] = useState([]);

  const handleImageCardClick = (card) => {
    setActiveModal("preview-image");
    setSelectedCard(card);
  };

  const onAddItem = (values) => {
    console.log(values);
  };

  const handleAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  const handleActiveModalClose = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleDeleteCard = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        handleActiveModalClose();
      })
      .catch(console.error);
  };

  const openDeleteConfirmationModal = (card) => {
    setActiveModal("delete-confirmation");
    setSelectedCard(card);
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleActiveModalClose();
      }
    }

    if (!activeModal) {
      return;
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, handleActiveModalClose]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const weatherData = filterWeatherData(data);
        setWeatherData(weatherData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <BrowserRouter>
            <Header
              handleAddClothesClick={handleAddClothesClick}
              weatherData={weatherData}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleImageCardClick={handleImageCardClick}
                    ClothingItems={ClothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    handleAddClothesClick={handleAddClothesClick}
                    handleImageCardClick={handleImageCardClick}
                    ClothingItems={ClothingItems}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          handleActiveModalClose={handleActiveModalClose}
          onAddItem={onAddItem}
        />
        <ItemModal
          isOpen={activeModal === "preview-image"}
          card={selectedCard}
          handleActiveModalClose={handleActiveModalClose}
          handleDeleteCard={handleDeleteCard}
          openDeleteConfirmationModal={openDeleteConfirmationModal}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          handleActiveModalClose={handleActiveModalClose}
          handleDeleteCard={handleDeleteCard}
          card={selectedCard}
        />

        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
