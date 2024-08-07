import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} className="profile__avatar" alt="Profle Avatar" />
      <p className="profile__name">Terrance Tegegne</p>
    </div>
  );
}

export default SideBar;
