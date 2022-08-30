import { useEffect, useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [nav, setNav] = useState<boolean>(false)
  const handleNav = () => {
    setNav(!nav)
  }
  return (
    <header className='w-full h-[100px] bg-brand mb-auto'>
      <div className='max-w-auto mx-auto px-4 flex justify-between items-center h-full'>
        <div>
          <h1 className='text-white'>UpTheReps</h1>
        </div>
        <div className='hidden md:flex'>
          <ul className='flex items-center text-white'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          </ul>
        </div>
        {/* Hamburger Menu */}
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? (
            <AiOutlineClose size={30} className='text-white cursor-pointer' />
          ) : (
            <AiOutlineMenu size={30} className='text-white cursor-pointer' />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'w-full bg-brand text-white absolute top-[90px] left-0 h-auto flex justify-center text-center'
              : 'absolute left-[-100%]'
          }
        >
          <ul>
            <li>
              <Link onClick={handleNav} to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link onClick={handleNav} to='/'>
                Register
              </Link>
            </li>
            <li>
              <Link onClick={handleNav} to='/'>
                Login
              </Link>
            </li>
            <li>
              <Link onClick={handleNav} to='/'>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
