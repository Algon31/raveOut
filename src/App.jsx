import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/Homepage'
import Hello from './components/Hello'
import ClubDetails from './components/ClubDetails';
import BookingPage from './components/BookingPage';

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
