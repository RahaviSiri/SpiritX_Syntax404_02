import React, { useContext } from "react";
import { Routes, Route, } from "react-router-dom"; 
import SideBar from "./components/SideBar";
import AddPlayer from "./pages/AddPlayer";
import Players from "./pages/Players";
import TournamentSummary from "./pages/TournamentSummary";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/adminContext.jsx";
import PlayerDetails from "./pages/PlayerDetails.jsx";

const App = () => {
  const { atoken } = useContext(AdminContext); 

  return atoken ? (
    <div className="flex ">
      <SideBar />
      <div className=" flex w-full">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<></>} /> 
          <Route path="/add" element={<AddPlayer/>} />
          <Route path="/add/:id" element={<AddPlayer/>} />
          <Route path="/players" element={<Players/>} />
          <Route path="/summary" element={<TournamentSummary/>} />
          <Route path="/players-details/:id" element={<PlayerDetails />} />
        </Routes>
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default App;
