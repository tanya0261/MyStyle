import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import List from './pages/List'
import Login from './pages/Login'
import AdminOrders from "./pages/AdminOrders";
import { useContext } from 'react'
import { adminDataContext } from './context/AdminContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  let {adminData} = useContext(adminDataContext)
  return (
    <>{!adminData ? <Login/> :<>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/list' element={<List/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/orders" element={<AdminOrders />} />
      </Routes>
      </>
      }
      <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    pauseOnHover
    theme="light"
  />
    </>
  )
}

export default App
