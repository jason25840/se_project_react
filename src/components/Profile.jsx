import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import "../blocks/Profile.css";

function Profile({
  handleAddClothesClick,
  handleImageCardClick,
  clothingItems,
  handleOpenEditProfileModal,
}) {
  const { setIsLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleOpenEditProfileModal={handleOpenEditProfileModal}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleImageCardClick={handleImageCardClick}
          handleAddClothesClick={handleAddClothesClick}
        />
      </section>
    </div>
  );
}

export default Profile;
