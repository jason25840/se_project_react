import { useState } from "react";
import ModalWithForm from "./ModalWithForm";

import "../blocks/ModalWithForm.css";

const RegisterModal = ({
  isOpen,
  handleActiveModalClose,
  handleRegistration,
  handleOpenLoginModal,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
    handleActiveModalClose();
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          name="email"
          className="input"
          type="email"
          id="register-email"
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
          name="password"
          className="input"
          type="password"
          id="register-password"
          placeholder="Password"
          value={data.password}
          onChange={onChange}
          minLength="2"
          maxLength="16"
          required
        />
        <span className="modal__error"></span>
      </label>
      <label className="modal__label">
        Name
        <input
          name="name"
          className="input"
          type="text"
          id="register-name"
          placeholder="Name"
          value={data.name}
          onChange={onChange}
          required
        />
        <span className="modal__error"></span>
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          name="avatar"
          className="input"
          type="text"
          id="register-avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={onChange}
          required
        />
        <span className="modal__error"></span>
      </label>

      <div className="modal__submit-btn-container">
        <button type="submit" className="modal__submit-btn">
          Next
        </button>
        <button
          className="modal__option-btn"
          type="button"
          onClick={handleOpenLoginModal}
        >
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;