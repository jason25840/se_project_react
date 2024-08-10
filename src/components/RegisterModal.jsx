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
      buttonText="Sign up"
      title="Sign up"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
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
          className="input"
          type="text"
          id="register-avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
        <span className="modal__error"></span>
      </label>
      <div className="modal__Submit-btn-container">
        <button
          className="modal__Submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
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
