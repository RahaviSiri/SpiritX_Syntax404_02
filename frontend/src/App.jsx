import React, { useContext } from 'react'
import { Routes,Route } from "react-router-dom"
import Home from './pages/Home'
import Players from './pages/Players'
import SelectTeam from './pages/SelectTeam'
import MyTeam from './pages/MyTeam'
import Budget from './pages/Budget'
import LeaderBoard from './pages/LeaderBoard'
import MyProfile from './components/MyProfile'
import CategoryPlayers from './components/CategoryPlayers'
import PlayersDetails from './components/PlayersDetails'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Batsman from './pages/Batsman'
import Bowler from './pages/Bowler'
import All_rounder from './pages/All_rounder'
import { UserContext } from './context/UserContext'
import Login from './components/login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const { uToken } = useContext(UserContext);

  return uToken ? (
    <div>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/players' element={<Players/>}/>
        <Route path='/select-team' element={<SelectTeam/>}/>
        <Route path='/myteam' element={<MyTeam/>}/>
        <Route path='/budget' element={<Budget/>}/>
        <Route path='/leaderboard' element={<LeaderBoard/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/category-players' element={<CategoryPlayers/>}/>
        <Route path='/player-details' element={<PlayersDetails/>}/>
        <Route path='/selectteam' element={<SelectTeam />}></Route>
        <Route path='/batsman' element={<Batsman />}></Route>
        <Route path='/bowler' element={<Bowler />}></Route>
        <Route path='/all-rounder' element={<All_rounder />}></Route>
      </Routes>
      <Footer/>
    </div>
  ) : (
    <div>
      <ToastContainer/>
      <Login/>
    </div>
    
  )
}

export default App
