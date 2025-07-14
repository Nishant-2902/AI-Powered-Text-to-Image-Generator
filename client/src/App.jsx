import React, { useContext } from 'react'
import Home from './pages/Home'
import Result from './pages/result'
import Credit from './pages/credit'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Foot from './components/Foot'
import Login from './components/Login'
import { Appcontext } from './context/Appcontext'


const App = () => {

  const {showLogin}= useContext(Appcontext);
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px28 min-h-screen bg-gradient-to-b from-red-100 to-blue-50'>

      <Navbar/>
      {showLogin && <Login/>}




      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
        <Route path='/buycredit' element={<Credit/>}></Route>
      </Routes>

      <Foot/>
      
    </div>
  )
}

export default App