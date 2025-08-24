import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LandingPage  from './pages/LandingPage'
import UserProvider from "./context/usercontext";
import Dashboard from './pages/Dashboard';
// import CreateResumeForm from './components/CreateResumeForm';

const App = () => {
  return (
    <UserProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* //<Route path="/create-resume" element={<CreateResumeForm />} /> */}

    </Routes>
    </UserProvider>
  )
}

export default App
