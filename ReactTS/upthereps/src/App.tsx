import { Route, Routes } from 'react-router-dom'
import Footer from './components/universalComponents/Footer'
import Navbar from './components/universalComponents/Navbar'
import ProtectedRoute from './components/unauthorizedComponents/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Unauthorized from './pages/Unauthorized'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route element={<ProtectedRoute allowedRoles='USER' />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
