import React from "react";
import "..header/header.css";

const PlaceholderAvatar = ({ name }) => {
  const initial = name ? name.charAt(0).toUpperCae() : "?";

  return (
    <div className="header__avatar">
      <span className="header__placeholder-avatar">{initial}</span>
    </div>
  );
};

export default PlaceholderAvatar;
