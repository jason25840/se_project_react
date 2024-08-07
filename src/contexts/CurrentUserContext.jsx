import { createContext, useState } from "react";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const isLoggedIn = !!currentUser;

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
