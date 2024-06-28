import React, { useRef } from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/whiteClose.svg";

function DeleteConfirmationModal({
  isOpen,
  handleActiveModalClose,
  handleConfirmDelete,
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
      <div className="modal__content" ref={modalRef}>
        <button
          onClick={handleActiveModalClose}
          type="button"
          className="modal__close"
        >
          <img src={closeIcon} alt="close" />
        </button>
        <div className="modal__body">
          <h2>Are you sure you want to delete this item?</h2>
          <button onClick={() => handleConfirmDelete(card)}>Yes</button>
          <button onClick={handleActiveModalClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
