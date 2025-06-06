import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './Components/HomePage'
import Hello from './Components/Hello'
import ClubDetails from './Components/ClubDetails';
import BookingPage from './Components/BookingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hello" element={<Hello/>} />
      <Route path="/club-details" element={<ClubDetails/>}/>
      <Route path="/booking" element={<BookingPage/>}/>

    </Routes>
    
    </>
  )
}

export default App
