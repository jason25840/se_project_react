import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleImageCardClick, ClothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          ClothingItems={ClothingItems}
          handleImageCardClick={handleImageCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
