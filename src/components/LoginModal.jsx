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

  // Define error messages for each input field
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Function to validate input fields
  const validateForm = (data) => {
    const newErrors = { email: "", password: "" };

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

    setErrors(newErrors);

    setIsValid(Object.values(newErrors).every((error) => error === ""));
  };

  // Function to handle input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    validateForm({ ...data, [name]: value });
  };

  useEffect(() => {
    validateForm(data);
  }, [data]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      // Form is valid, proceed with submission
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
      <label className="modal__label">
        Email
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
      <label className="modal__label">
        Password
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
            Object.values(errors).every((error) => error === "")
              ? "modal__submit-btn_active"
              : ""
          }`}
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
