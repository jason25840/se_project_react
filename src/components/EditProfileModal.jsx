import "../blocks/ModalWithForm.css";
import { useState, useContext, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfileModal = ({
  isOpen,
  handleActiveModalClose,
  handleEditProfile,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [profileData, setProfileData] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setProfileData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    handleEditProfile(profileData);
    handleActiveModalClose();
  };

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Edit profile"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={profileData.name}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="modal__input-error"></span>
      </label>
      <label className="modal__label">
        Avatar
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar"
          value={profileData.avatar}
          onChange={handleChange}
          required
        />
        <span className="modal__input-error"></span>
      </label>
      <button className="modal__submit-btn">Save changes</button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
