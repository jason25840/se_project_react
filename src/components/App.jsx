import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "../blocks/App.css";
import Header from "./Header";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { APIkey, coordinates } from "../utils/constants";
import Main from "./Main";
import Profile from "./Profile";
import ItemModal from "./ItemModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import Footer from "./Footer";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import {
  CurrentUserProvider,
  CurrentUserContext,
} from "../contexts/CurrentUserContext";
import AddItemModal from "./AddItemModal";
import { getItems, deleteItem, addItem } from "../utils/api";
import auth from "../utils/auth";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ProtectedRoute from "./ProtectedRoute";

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
  //const [currentUser, setCurrentUser] = useState(null);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(CurrentUserContext);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getUserInfo(token)
        .then((user) => {
          if (user && user._id) {
            setCurrentUser(user);
            setIsLoggedIn(true);
          } else {
            console.error("Invalid user data received", user);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user info", err);
          localStorage.removeItem("jwt");
        });
    }
  }, [setCurrentUser]);

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegistration = ({ email, name, password, avatar }) => {
    auth
      .register(email, password, name, avatar)
      .then(() => {
        return auth.authorize(email, password);
      })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return APIkey.getUserInfo(data.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal("");
        Navigate("/profile");
      })
      .catch(console.error);
  };
  const handleImageCardClick = (card) => {
    setActiveModal("preview-image");
    setSelectedCard(card);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return api.getUserInfo(data.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal("");
        Navigate("/profile");
      })
      .catch(console.error);
  };

  const handleAddItem = (newItem) => {
    const token = localStorage.getItem("jwt");

    addItem(newItem, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        handleActiveModalClose();
      })
      .catch(console.error);
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
    const token = localStorage.getItem("jwt");

    deleteItem(card._id, token)
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
        const itemsWithIds = data.map((item) => {
          if (!item._id) {
            console.error("Item is missing _id:", item);
          }
          return item;
        });
        setClothingItems(data);
        console.log(itemsWithIds);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentUserProvider>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <BrowserRouter>
              <Header
                userName={currentUser?.name}
                userAvatar={currentUser?.avatar}
                isAuthorized={isLoggedIn}
                handleProfileClick={() => Navigate("/profile")}
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
                    <ProtectedRoute>
                      <Profile
                        userName={currentUser?.name}
                        userAvatar={currentUser?.avatar}
                        handleAddClothesClick={handleAddClothesClick}
                        handleImageCardClick={handleImageCardClick}
                        clothingItems={clothingItems}
                      />
                    </ProtectedRoute>
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
            handleAddItem={handleAddItem}
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
      </CurrentUserProvider>
    </div>
  );
}

export default App;
