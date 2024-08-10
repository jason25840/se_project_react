import "../blocks/ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onImageCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!item) {
    return null;
  }
  const isLiked =
    Array.isArray(item.likes) &&
    currentUser &&
    item.likes.some((user) => user._id === currentUser._id);

  const handleCardClick = () => {
    onImageCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
