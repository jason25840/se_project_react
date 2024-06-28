//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
function ClothesSection({ handleImageCardClick, ClothingItems = [] }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__button">+ Add New</button>
      </div>
      <ul className="cards__list">
        {ClothingItems.map((item) => {
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
