import "../blocks/ItemCard.css";

import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onImageCardClick, handleCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((like) => like._id === currentUser._id);

  const handleCardClick = () => {
    onImageCardClick(item);
  };

  const handleLikeClick = () => {
    handleCardLike({ _id: item._id, isLiked });
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
      {currentUser && (
        <button
          onClick={handleLikeClick}
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          type="button"
          aria-label="Like"
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
