import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { setToken, getToken, removeToken } from "../utils/token";
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
import CurrentUserContext from "../contexts/CurrentUserContext";
import AddItemModal from "./AddItemModal";
import { getItems, deleteItem } from "../utils/api";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

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

  const handleRegistration = ({ name, email, password, avatar }) => {
    if (password) {
      auth
        .register(email, password, name, avatar)
        .then(() => {
          setActiveModal("login");
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
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

  const handleLogout = () => {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    Navigate("/");
    setActiveModal("login");
  };

  const handleEditProfileSubmit = (data) => {
    if (!data) {
      setActiveModal("edit");
    } else {
      api
        .editProfile(data)
        .then((updatedUser) => {
          setCurrentUser(updatedUser.data);
          setActiveModal("");
          Navigate("/profile");
        })
        .catch((err) => console.log(err));
    }
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

  const onCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch(console.error);
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

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user.data);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
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
                      onCardLike={onCardLike}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <Profile
                      userName={currentUser?.name}
                      userAvatar={currentUser?.avatar}
                      onEditProfileSubmit={handleEditProfileSubmit}
                      onCardLike={onCardLike}
                      onDeleteCard={openDeleteConfirmationModal}
                      handleAddClothesClick={handleAddClothesClick}
                      handleImageCardClick={handleImageCardClick}
                      clothingItems={clothingItems}
                      onLogout={handleLogout}
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
                    />
                  }
                  handleOpenLoginModal={handleOpenLoginModal}
                />

                <Route
                  path="/login"
                  element={
                    <LoginModal
                      isOpen={activeModal === "login"}
                      handleActiveModalClose={handleActiveModalClose}
                      handleLogin={handleLogin}
                      handleOpenRegisterModal={handleOpenRegisterModal}
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
