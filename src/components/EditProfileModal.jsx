import "../blocks/ModalWithForm.css";
import { useContext, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../Hooks/useFormAndValidation";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfileModal = ({
  isOpen,
  handleActiveModalClose,
  handleEditProfile,
  handleSubmit,
  isLoading,
}) => {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();
  const { currentUser } = useContext(CurrentUserContext);

  //const [profileData, setProfileData] = useState({
  // name: "",
  //  avatar: "",
  //});

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, setValues]);

  //const handleChange = (e) => {
  // const { name, value } = e.target;
  //  setProfileData((prev) => ({ ...prev, [name]: value }));
  //};

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const makeRequest = () => {
      return handleEditProfile(values)
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          console.error("Error editing profile:", error);
        });
    };
    handleSubmit(makeRequest);
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? "Saving..." : "Save changes"}
      title="Edit profile"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={handleFormSubmit}
    >
      <label
        className={`modal__label ${errors.name ? "modal__label_invalid" : ""}`}
      >
        {errors.name ? "Enter a valid name" : "Name"}
        <input
          type="text"
          name="name"
          className={`modal__input ${
            errors.name ? "modal__input_invalid" : ""
          }`}
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
      </label>
      <label
        className={`modal__label ${
          errors.avatar ? "modal__label_invalid" : ""
        }`}
      >
        {errors.avatar ? "Enter a valid url" : "Avatar"}
        <input
          type="url"
          name="avatar"
          className={`modal__input ${
            errors.avatar ? "modal__input_invalid" : ""
          }`}
          placeholder="Avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </label>
      <button
        type="submit"
        className={`modal__submit-btn ${
          isValid && !isLoading ? "modal__submit-btn_active" : ""
        }`}
        disabled={!isValid || isLoading}
      >
        {isLoading ? "Loading..." : "Save changes"}
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
