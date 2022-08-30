import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { GlobalStateProvider } from './context/GlobalStateProvider'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Unauthorized from './pages/Unauthorized'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <GlobalStateProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='unauthorized' element={<Unauthorized />} />
        </Routes>
        <Footer />
      </GlobalStateProvider>
    </div>
  )
}

export default App
