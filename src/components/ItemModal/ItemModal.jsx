import "./ItemModal.css";

import React, { useEffect, useRef } from "react";
import previewClose from "../../assets/whiteClose.svg";

function ItemModal({ activeModal, handleActiveModalClose, card }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleActiveModalClose();
      }
    }
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleActiveModalClose();
      }
    }

    if (activeModal === "add-garment") {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeModal, handleActiveModalClose]);

  return (
    <div
      className={`modal ${activeModal === "preview-image" && "modal_opened"}`}
    >
      <div className="modal__content_type_image">
        <button
          onClick={handleActiveModalClose}
          type="button"
          className="modal__close"
        >
          <img src={previewClose} alt="close" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
