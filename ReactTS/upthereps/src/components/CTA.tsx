import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='flex flex-col items-center justify-center text-center min-w-full min-h-[300px]'>
      <h1 className='text-4xl'>Join Us Now</h1>
      <p className=''>
        Your best self is just out of reach - click the button to join us on the journey to chase it
      </p>
      <button>
        <Link to='/'>Join Us</Link>
      </button>
    </section>
  )
}

export default CTA
