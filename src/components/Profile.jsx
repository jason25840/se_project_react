import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import EditProfileModal from "./EditProfileModal";
import "../blocks/Profile.css";

function Profile({
  userName,
  userAvatar,
  handleAddClothesClick,
  handleImageCardClick,
  clothingItems,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
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
