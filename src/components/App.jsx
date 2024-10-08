import { useState, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "../blocks/App.css";
import Header from "./Header";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { APIkey, coordinates } from "../utils/constants";
import Main from "./Main";
import Profile from "./Profile";
import ItemModal from "./ItemModal";
import RegisterModal from "./RegisterModal";
import EditProfileModal from "./EditProfileModal";
import LoginModal from "./LoginModal";
import Footer from "./Footer";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddItemModal from "./AddItemModal";
import {
  getItems,
  deleteItem,
  addItem,
  addCardLike,
  removeCardLike,
} from "../utils/api";
import { setToken } from "../utils/token";
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
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(CurrentUserContext);

  const navigate = useNavigate();

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleActiveModalClose)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

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

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegistration = ({ email, name, password, avatar }) => {
    return auth
      .register(email, password, name, avatar)
      .then(() => {
        return auth.authorize(email, password);
      })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return auth.getUserInfo(data.token);
        } else {
          return Promise.reject("Authorization failed");
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
      });
  };
  const handleImageCardClick = (card) => {
    setActiveModal("preview-image");
    setSelectedCard(card);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return Promise.reject("Empty email or password");
    }
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return auth.getUserInfo(data.token);
        } else {
          return Promise.reject("Invalid email or password");
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return auth.editUserInfo(name, avatar, token).then((user) => {
      setCurrentUser(user.data);
    });
  };

  const handleCardLike = ({ _id }, isLiked) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      return addCardLike(_id, token).then((newCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === _id ? newCard : item))
        );
      });
    } else {
      return removeCardLike(_id, token).then((newCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === _id ? newCard : item))
        );
      });
    }
  };

  const handleAddItem = (newItem) => {
    return addItem(newItem).then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
    });
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
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
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
                  onLikeClick={handleCardLike}
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
                  handleSubmit={handleSubmit}
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
                    handleOpenEditProfileModal={handleOpenEditProfileModal}
                    onLikeClick={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <RegisterModal
          isOpen={activeModal === "register"}
          handleActiveModalClose={handleActiveModalClose}
          handleRegistration={handleRegistration}
          handleOpenLoginModal={handleOpenLoginModal}
          handleSubmit={handleSubmit}
        />

        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          handleActiveModalClose={handleActiveModalClose}
          handleEditProfile={handleEditProfile}
          handleSubmit={handleSubmit}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          handleActiveModalClose={handleActiveModalClose}
          handleLogin={handleLogin}
          handleOpenRegisterModal={handleOpenRegisterModal}
          handleSubmit={handleSubmit}
        />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          handleActiveModalClose={handleActiveModalClose}
          handleAddItem={handleAddItem}
          handleSubmit={handleSubmit}
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
