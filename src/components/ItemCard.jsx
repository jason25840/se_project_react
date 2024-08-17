import "../blocks/ItemCard.css";

import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onImageCardClick, onLikeClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(
      item.likes.some((like) => {
        return like === currentUser?._id;
      })
    );
  }, [isLoggedIn]);

  const handleCardClick = () => {
    onImageCardClick(item, isLiked);
  };

  function handleCardLikeClick(e) {
    e.preventDefault();
    e.stopPropagation();
    onLikeClick(item, isLiked)
      .then(() => {
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  console.log("isLiked", isLiked);
  return (
    <li className="card">
      <div className="title__container">
        <h2 className="card__title">{item.name}</h2>
        {currentUser && (
          <button
            onClick={handleCardLikeClick}
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            type="button"
            aria-label="Like"
          ></button>
        )}
      </div>
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
