import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
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
