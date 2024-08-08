import React, { useState } from "react";
import "../blocks/header.css";
import logo from "../assets/logo.svg";
import PlaceholderAvatar from "./PlaceHolderAvatar";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
function Header({
  handleAddClothesClick,
  weatherData,
  userAvatar = "",
  userName = "GUEST",
  handleOpenRegisterModal,
  handleOpenLoginModal,
  isAuthorized,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        {isAuthorized ? (
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
            <Link
              to="/profile"
              className="header__profile-link"
              onClick={handleProfileClick}
            >
              <p className="header__username">{userName}</p>
              {avatar ? (
                <img src={userAvatar} alt="avatar" className="header__avatar" />
              ) : (
                <PlaceholderAvatar name={userName} />
              )}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="header__signup-btn"
              onClick={handleOpenRegisterModal}
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="header__login-btn"
              onClick={handleOpenLoginModal}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
export default Header;
