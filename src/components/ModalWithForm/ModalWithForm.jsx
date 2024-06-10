import "./ModalWithForm.css";

import React, { useEffect, useRef } from "react";
import close from "../../assets/close.svg";

function ModalWithForm({ children, activeModal, handleActiveModalClose }) {
  const modalRef = useRef();

  useEffect(() => {
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      handleActiveModalClose();
    }
  }

  if (activeModal === "add-garment") {
    document.addEventListener("keydown", handleKeyDown);
  } else {
    document.removeEventListener("keydown", handleKeyDown);
  }

  return () => document.removeEventListener("keydown", handleKeyDown);

  }, [activeModal, handleActiveModalClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleActiveModalClose();
    }
  };

  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
      aria-label="close"
      onPointerDown={handleClickOutside}
    >
      <div className="modal__content" ref={modalRef}>
        <h2 className="modal__title">New Garment</h2>
        <button
          onClick={handleActiveModalClose}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
