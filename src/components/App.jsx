import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { APIkey, coordinates } from "../../utils/constants";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
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
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleImageCardClick = (card) => {
    setActiveModal("preview-image");
    setSelectedCard(card);
  };

  const onAddItem = (newItem) => {
    setClothingItems((prevItems) => [newItem, ...prevItems]);
    handleActiveModalClose();
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
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <BrowserRouter>
              <Header
                handleAddClothesClick={handleAddClothesClick}
                weatherData={weatherData}
                handleOpenRegisterModal={handleOpenRegisterModal}
                handleOpenLoginModal={handleOpenLoginModal}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleImageCardClick={handleImageCardClick}
                      clothingItems={clothingItems}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <RegisterModal
                      isOpen={activeModal === "register"}
                      handleActiveModalClose={handleActiveModalClose}
                      handleRegistration={handleRegistration}
                      handleOpenLoginModal={handleOpenLoginModal}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      handleAddClothesClick={handleAddClothesClick}
                      handleImageCardClick={handleImageCardClick}
                      clothingItems={clothingItems}
                    />
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>

          <RegisterModal
            isOpen={activeModal === "register"}
            handleActiveModalClose={handleActiveModalClose}
            handleRegistration={handleRegistration}
            handleOpenLoginModal={handleOpenLoginModal}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            handleActiveModalClose={handleActiveModalClose}
            handleLogin={handleLogin}
            handleOpenRegisterModal={handleOpenRegisterModal}
          />
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
