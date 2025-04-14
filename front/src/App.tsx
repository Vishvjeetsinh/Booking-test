import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import SignUpPage from './pages/sign-up'
import PrivateRoute from './routes/PrivateRoute'
import BookingPage from './pages/booking'
import { Dashboard } from './pages/dashboard'
import NotFoundPage from "./pages/notFound";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/booking' element={<PrivateRoute children={<BookingPage />} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
