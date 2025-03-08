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
import Category from './pages/Category'
import Batsman from './pages/Batsman'
import Bowler from './pages/Bowler'
import All_rounder from './pages/All_rounder'

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
        <Route path='/' element={<Category />}></Route>
        <Route path='/batsman' element={<Batsman />}></Route>
        <Route path='/bowler' element={<Bowler />}></Route>
        <Route path='/all-rounder' element={<All_rounder />}></Route>
      </Routes>
    </div>
  )
}

export default App