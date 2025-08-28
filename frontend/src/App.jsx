import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LandingPage  from './pages/LandingPage'
import UserProvider from "./context/usercontext";
import Dashboard from './pages/Dashboard';
import EditResume from './components/EditResume';
import { Toaster } from 'react-hot-toast';
import CreateResumeForm from './components/CreateResumeForm';

const App = () => {
  return (
    <UserProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-resume" element={<CreateResumeForm />} />
      <Route path='/resume/:resumeId' element={<EditResume/>}></Route>
    </Routes>
    <Toaster toastOptions={{
      className:"",
      style:{
        fontSize:"13px",
      }
    }}></Toaster>
    </UserProvider>
  )
}

export default App
