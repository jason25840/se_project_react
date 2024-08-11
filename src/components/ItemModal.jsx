import "../blocks/ItemModal.css";
import React, { useRef, useContext } from "react";
import previewClose from "../assets/whiteClose.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemModal({
  isOpen,
  handleActiveModalClose,
  card,
  openDeleteConfirmationModal,
}) {
  const modalRef = useRef();

  const { currentUser } = useContext(CurrentUserContext);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleActiveModalClose();
    }
  };
  const isOwn = card.owner === currentUser?._id;

  const itemDeleteButtonClassName = `item__delete-card__button ${
    isOwn
      ? "item__delete-card__button_visible"
      : "item__delete-card__button_hidden"
  }`;
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      aria-label="close"
      onPointerDown={handleClickOutside}
    >
      <div className="modal__content_type_image" ref={modalRef}>
        <button
          onClick={handleActiveModalClose}
          type="button"
          className="modal__close"
        >
          <img src={previewClose} alt="close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              className={itemDeleteButtonClassName}
              onClick={() => openDeleteConfirmationModal(card)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
