import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

const LoginModal = ({
  isOpen,
  handleActiveModalClose,
  onLogin,
  handleOpenRegisterModal,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data);
    handleActiveModalClose();
  };

  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={onChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="modal__error"></span>
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="password"
          placeholder="Password"
          value={data.password}
          onChange={onChange}
          minLength="2"
          maxLength="16"
          required
        />
        <span className="modal__error"></span>
      </label>
      <div className="modal__Submit-btn-container">
        <button type="submit" className="modal__submit-btn">
          Log in
        </button>
        <button
          type="button"
          className="modal__option-btn"
          onClick={handleOpenRegisterModal}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
