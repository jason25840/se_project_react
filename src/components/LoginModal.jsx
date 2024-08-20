import { useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../Hooks/useFormAndValidation";

import "../blocks/ModalWithForm.css";

const LoginModal = ({
  isOpen,
  handleActiveModalClose,
  handleLogin,
  handleOpenRegisterModal,
  handleSubmit,
  isLoading,
}) => {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const makeRequest = () => handleLogin(values);
      handleSubmit(makeRequest);
    }
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? "Loading..." : "Log in"}
      title="Log in"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={handleFormSubmit}
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
          value={values.email || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
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
          value={values.password || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="16"
          required
        />
      </label>
      <div className="modal__submit-btn-container">
        <button
          type="submit"
          className={`modal__submit-btn ${
            isValid && !isLoading ? "modal__submit-btn_active" : ""
          }`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Loading..." : "Log in"}
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
