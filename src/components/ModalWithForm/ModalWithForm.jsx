import "./ModalWithForm.css";
import close from "../../assets/close.svg";

function ModalWithForm({ children, buttonText, Title, activeModal }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">New Garment</h2>
        <button type="button" className="modal__close">
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
