import { Link } from 'react-router-dom'
import lifter from '../../assets/Lifter.jpg'
const Hero = () => {
  return (
    <section className='w-screen min-h-[300px] h-fit'>
      <div className='m-2 p-2 flex flex-col md:flex-row max-w-1/2 items-center justify-center text-center lg:mx-24'>
        <div className='w-full h-fit lg:w-1/2 flex flex-col justify-between items-center text-center m-2 p-2'>
          <h1>
            “When we strive to become better than we are, everything around us becomes better too.”
            Click the button to join us on the journey to become better.
          </h1>
          <button>
            <Link to='/register'>Join Us</Link>
          </button>
        </div>
        <div className='w-full h-fit lg:w-1/2 p-2 m-2 order-first md:order-last'>
          <img src={lifter} alt='lifter' className='w-full rounded-[36px]' />
        </div>
      </div>
    </section>
  )
}

export default Hero
