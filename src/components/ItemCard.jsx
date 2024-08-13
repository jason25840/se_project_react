import "../blocks/ItemCard.css";
//import hollowHeart from "../assets/hollowHeart.png";
//import solidHeart from "../assets/solidHeart.png";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onImageCardClick, handleCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikedButtonClassName = `card__like-button ${
    isLiked ? "card__like-button__liked" : "card__like-button__unliked"
  }`;

  //const likeIcon = isLiked ? solidHeart : hollowHeart;

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
          className={itemLikedButtonClassName}
          type="button"
          aria-label={isLiked ? "unlike" : "like"}
        >
          {/*<img src={likeIcon} alt="isLiked ? 'unlike' : 'like" />*/}
          <span className="card__like-count">{item.likes.length}</span>
        </button>
      )}
    </li>
  );
}

export default ItemCard;
