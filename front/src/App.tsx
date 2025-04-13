import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import SignUpPage from './pages/sign-up'
import PrivateRoute from './routes/PrivateRoute'
import BookingPage from './pages/booking'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/booking" element={<BookingForm />} /> */}
        <Route path='/booking' element={<PrivateRoute children={<BookingPage />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
