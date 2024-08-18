import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

import "../blocks/ModalWithForm.css";

const LoginModal = ({
  isOpen,
  handleActiveModalClose,
  handleLogin,
  handleOpenRegisterModal,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const validateForm = (data) => {
    const newErrors = { email: false, password: false };

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
      handleLogin(data);
      handleActiveModalClose();
    }
  };

  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
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
          id="email"
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
          id="password"
          placeholder="Password"
          value={data.password}
          onChange={onChange}
          minLength="2"
          maxLength="16"
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <div className="modal__submit-btn-container">
        <button
          type="submit"
          className={`modal__submit-btn ${
            isValid ? "modal__submit-btn_active" : ""
          }`}
          disabled={!isValid}
        >
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
