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
    const newErrors = {
      email: false,
      password: false,
      name: false,
      avatar: false,
    };

    if (
      data.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
    ) {
      newErrors.email = true;
    }

    if (
      (data.password && data.password.length < 2) ||
      data.password.length > 16
    ) {
      newErrors.password = true;
    }

    if (data.name && data.name.length < 2) {
      newErrors.name = true;
    }

    if (
      data.avatar &&
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i.test(
        data.avatar
      )
    ) {
      newErrors.avatar = true;
    }

    setErrors(newErrors);

    setIsValid(Object.values(newErrors).every((error) => error === false));
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
      <label
        className={`modal__label ${errors.email ? "modal__label_invalid" : ""}`}
      >
        {errors.email ? "Enter a valid email" : "Email"}
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
      <label
        className={`modal__label ${
          errors.password ? "modal__label_invalid" : ""
        }`}
      >
        {errors.password ? "Enter a valid password" : "Password"}
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
      <label
        className={`modal__label ${errors.name ? "modal__label_invalid" : ""}`}
      >
        {errors.name ? "Name is required" : "Name"}
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
      <label
        className={`modal__label ${
          errors.avatar ? "modal__label_invalid" : ""
        }`}
      >
        {errors.avatar ? "Enter a valid URL" : "Avatar URL"}
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
