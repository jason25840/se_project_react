import { useState, useEffect } from "react";
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

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [isValid, setIsValid] = useState(false);

  const validateForm = (data) => {
    const newErrors = { email: "", password: "", name: "", avatar: "" };

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 2 || data.password.length > 16) {
      newErrors.password = "Password must be between 2 and 16 characters long";
    }

    if (!data.name) {
      newErrors.name = "Name is required";
    }

    if (!data.avatar) {
      newErrors.avatar = "Avatar is required";
    } else if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i.test(
        data.avatar
      )
    ) {
      newErrors.avatar = "Invalid avatar URL";
    }

    setErrors(newErrors);

    setIsValid(Object.values(newErrors).every((error) => error === ""));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    validateForm({ ...data, [name]: value });
  };

  useEffect(() => {
    validateForm(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegistration(data);
      handleActiveModalClose();
    }
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
          className={`modal__input ${
            errors.email ? "modal__input_invalid" : ""
          }`}
          type="email"
          id="register-email"
          placeholder="Email"
          value={data.email}
          onChange={onChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label className="modal__label">
        Password
        <input
          name="password"
          className={`modal__input ${
            errors.password ? "modal__input_invalid" : ""
          }`}
          type="password"
          id="register-password"
          placeholder="Password"
          value={data.password}
          onChange={onChange}
          minLength="2"
          maxLength="16"
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <label className="modal__label">
        Name
        <input
          name="name"
          className={`modal__input ${
            errors.name ? "modal__input_invalid" : ""
          }`}
          type="text"
          id="register-name"
          placeholder="Name"
          value={data.name}
          onChange={onChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          name="avatar"
          className={`modal__input ${
            errors.avatar ? "modal__input_invalid" : ""
          }`}
          type="text"
          id="register-avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={onChange}
          required
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>

      <div className="modal__submit-btn-container">
        <button
          type="submit"
          className={`modal__submit-btn ${
            isValid ? "modal__submit-btn_active" : ""
          }`}
          disabled={!isValid}
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
