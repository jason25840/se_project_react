import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
function Header({ handleAddClothesClick, weatherData }) {
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
        <button
          onClick={handleAddClothesClick}
          type="button"
          className="header__add-clothes-btn"
        >
          <span className="header__add-clothes-btn-text">+ Add Clothes</span>
        </button>
        <Link to="/profile" className="header__user-name">
          Terrance Tegegne
        </Link>
        <img src={avatar} alt="Terrance Tegegne" className="header__avatar" />
      </div>
    </div>
  );
}
export default Header;
