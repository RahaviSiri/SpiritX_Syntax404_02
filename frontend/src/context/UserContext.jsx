import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");
  const backendURL = "http://localhost:4500";
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('uToken');
    if (token) {
      setUToken(token);
    }
  }, []);

  const fetchTeam = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/team/get-team-players",{
        headers: {
          Authorization: `Bearer ${uToken}`, 
        },
      });
      if(data.success){
        setTeam(data.teamPlayers);
      }else{
        toast.error("Error in fetching team players")
      }
    }
    catch (error) {
      if (team.length === 0) {
         return toast.info("Your team has no players yet. Start adding players!");
      }
      toast.error(error.message)
    }
  }

  return (
    <UserContext.Provider value={{ uToken, setUToken,backendURL,fetchTeam,team }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;