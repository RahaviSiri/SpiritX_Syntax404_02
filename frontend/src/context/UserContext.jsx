import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");
  const backendUrl = "http://localhost:4500"

  useEffect(() => {
    localStorage.setItem("uToken", uToken);
  }, [uToken]);

  return (
    <UserContext.Provider value={{ uToken, setUToken, backendUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;