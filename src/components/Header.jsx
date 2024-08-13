import React, { useContext } from "react";
import "../blocks/Header.css";
import logo from "../assets/logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
function Header({
  handleAddClothesClick,
  weatherData,
  handleOpenLoginModal,
  handleOpenRegisterModal,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const getPlaceholderAvatar = (name) => {
    const initial = name[0].toUpperCase();
    return <div className="header__placeholder-name">{initial}</div>;
  };

  return (
    <div className="header">
      <div className="header__title-container">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__user-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClothesClick}
              type="button"
              className="header__add-clothes-btn"
            >
              <span className="header__add-clothes-btn-text">
                + Add Clothes
              </span>
            </button>
            <Link to="/profile" className="header__profile-section">
              <p className="header__user-name">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="header__avatar"
                />
              ) : (
                getPlaceholderAvatar(currentUser.name)
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleOpenRegisterModal}
              className="header__signup-btn"
            >
              Signup
            </button>
            <button
              type="button"
              onClick={handleOpenLoginModal}
              className="header__login-btn"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default Header;
