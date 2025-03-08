import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [atoken, setAtoken] = useState(localStorage.getItem("aToken") || "");

  useEffect(() => {
    localStorage.setItem("aToken", atoken);
  }, [atoken]);

  return (
    <AdminContext.Provider value={{ atoken, setAtoken }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
