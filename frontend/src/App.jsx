import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LandingPage  from './pages/LandingPage'
import UserProvider from "./context/usercontext";
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <UserProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </UserProvider>
  )
}

export default App
