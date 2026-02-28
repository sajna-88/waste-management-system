import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Landing from './Landing'
import UserDashboard from './UserDashboard'
import AdminDashboard from './AdminDashboard'
import Contact from './Contact'
import About from './About'
import Register from './components/Register';
import Schedule from './components/Schedule'
import Profile from './components/Profile'
import ManageUsers from './ManageUsers'
import History from './History'



function App() {
  return (
    <Router>
      <Routes>
      <Route path='/Reg' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Lan' element={<Landing/>}/>
      <Route path='/Con' element={<Contact/>}/>
       <Route path='/Abo' element={<About/>}/>
        <Route path='/userdashboard' element={<UserDashboard/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/Sch' element={<Schedule/>}/>
         <Route path='/Pro' element={<Profile/>}/>
         <Route path='/Man' element={<ManageUsers/>}/>
         <Route path='/His' element={<History/>}/>
      </Routes>
    </Router>
  )
}
export default App
