import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
function Header() {
  return (
    <div className="header">
      <div className="header__title-container">
        <img src={logo} alt="logo" className="header__logo" />
        <p className="header__date-and-location">Date and Location</p>
      </div>
      <div className="header__user-container">
        <button className="header__add-clothes-btn">+ Add Clothes</button>
        <p className="header__user-name">Terrance Tegegne</p>
        <img src={avatar} alt="Terrance Tegegne" className="header__avatar" />
      </div>
    </div>
  );
}
export default Header;
