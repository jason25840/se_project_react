import "../blocks/ItemCard.css";

function ItemCard({ item, onImageCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!item) {
    return null;
  }
  const isLiked =
    Array.isArray(item.likes) &&
    currentUser &&
    item.likes.some((user) => user._id === currentUser._id);
  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

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

      <button
        onClick={() => onCardLike(item)}
        className={likeButtonClassName}
        type="button"
      >
        <img
          className="card__like-icon"
          src={isLiked ? heartSolid : heartHollow}
          alt="like"
        />
      </button>
    </li>
  );
}

export default ItemCard;
