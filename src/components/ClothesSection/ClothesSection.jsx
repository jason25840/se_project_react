import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
function ClothesSection({
  handleAddClothesClick,
  handleImageCardClick,
  clothingItems = [],
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          onClick={handleAddClothesClick}
          className="clothes-section__button"
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onImageCardClick={handleImageCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
