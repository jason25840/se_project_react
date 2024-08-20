import { useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../Hooks/useFormAndValidation";

import "../blocks/ModalWithForm.css";

const RegisterModal = ({
  isOpen,
  handleActiveModalClose,
  handleRegistration,
  handleOpenLoginModal,
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
      const makeRequest = () => handleRegistration(values);

      handleSubmit(makeRequest);
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
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
          id="register-email"
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
          id="register-password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="16"
          required
        />
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
          value={values.name || ""}
          onChange={handleChange}
          required
        />
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
          type="url"
          id="register-avatar"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
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
          {isLoading ? "Loading..." : "Next"}
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
