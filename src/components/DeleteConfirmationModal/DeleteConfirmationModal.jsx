import React, { useRef } from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/close.svg";

function DeleteConfirmationModal({
  isOpen,
  handleActiveModalClose,
  handleDeleteCard,
  card,
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
      <div className="delete-modal__content" ref={modalRef}>
        <button
          onClick={handleActiveModalClose}
          type="button"
          className="modal__close"
        >
          <img src={closeIcon} alt="close" />
        </button>
        <div className="modal__body">
          <div className="delete-card__text-wrapper">
            <p className="delete-card__text">
              Are you sure you want to delete this item?
            </p>
            <p className="delete-card__text">This action is irreversible.</p>
          </div>
          <div className="buttons">
            <button
              className="confirm-delete-card__button"
              onClick={() => handleDeleteCard(card)}
            >
              Yes, delete the item
            </button>
            <button
              className="cancel-delete__button"
              onClick={handleActiveModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
