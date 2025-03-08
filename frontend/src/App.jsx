import React from 'react'
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
import PlayerAvailability from './pages/PlayerAvailability'

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path='/players' element={<Players/>}/>
        <Route path='/select-team' element={<SelectTeam/>}/>
        <Route path='/Team' element={<MyTeam/>}/>
        <Route path='/budget' element={<Budget/>}/>
        <Route path='/leader-board' element={<LeaderBoard/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/category-players' element={<CategoryPlayers/>}/>
        <Route path='/player-details' element={<PlayersDetails/>}/>
        <Route path='/' element={<PlayerAvailability/>}/>
      </Routes>
    </div>
  )
}

export default App