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
  onCardLike,
  handleEditProfile,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          userName={userName}
          userAvatar={userAvatar}
          handleEditProfile={handleEditProfile}
          onLogout={onLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleImageCardClick={handleImageCardClick}
          handleAddClothesClick={handleAddClothesClick}
          onCardLike={onCardLike}
        />
        <EditProfileModal
          isOpen={false}
          handleEditProfile={handleEditProfile}
          handleActiveModalClose={handleActiveModalClose}
        />
      </section>
    </div>
  );
}

export default Profile;
