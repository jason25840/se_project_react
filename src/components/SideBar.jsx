import { useContext } from "react";
import "../blocks/SideBar.css";

import CurrentUserContext from "../contexts/CurrentUserContext";

function SideBar({ handleEditProfile, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-section">
        <img
          src={currentUser.avatar}
          className="sidebar__avatar"
          alt="Profle Avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__options">
        <button
          type="button"
          className="sidebar__edit_profile-btn"
          onClick={handleEditProfile}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
