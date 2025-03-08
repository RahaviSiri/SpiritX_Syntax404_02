import React from 'react'
import SideBar from './components/SideBar'
import { Routes,Route } from "react-router-dom"
import AddPlayer from './pages/AddPlayer'
import Players from './pages/Players'
import TournamentSummary from './pages/TournamentSummary'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const App = () => {
  return (
    <div className='flex w-full'>
      <ToastContainer/>
      <SideBar/>
      <Routes>
        <Route path='/add' element={<AddPlayer/>}/>
        <Route path='/players' element={<Players/>}/>
        <Route path='/summary' element={<TournamentSummary/>}/>
      </Routes>
    </div>
  )
}

export default App