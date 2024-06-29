import "./ItemModal.css";
import React, { useRef } from "react";
import previewClose from "../../assets/whiteClose.svg";

function ItemModal({
  isOpen,
  handleActiveModalClose,
  card,
  openDeleteConfirmationModal,
}) {
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleActiveModalClose();
    }
  };

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
          <button
            className="delete-card__button"
            onClick={() => openDeleteConfirmationModal(card)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
