import { BsFillPersonCheckFill, BsFillArrowUpSquareFill } from 'react-icons/bs'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { MdInsights } from 'react-icons/md'
const Process = () => {
  return (
    <section className='flex flex-col text-center items-center justify-center min-w-full min-h-[300px]'>
      <h1 className='mb-8'>The Process</h1>
      <div className='flex flex-wrap justify-between items-start'>
        <div className='w-full sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center p-2'>
          <div className='w-auto h-auto'>
            <BsFillPersonCheckFill size={80} />
          </div>
          <h3>Sign Up</h3>
        </div>
        <div className='w-full sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center p-2'>
          <div className='w-auto h-auto'>
            <GiWeightLiftingUp size={80} />
          </div>
          <h3>Track Your Lifts</h3>
        </div>
        <div className='w-full sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center p-2'>
          <div className='w-auto h-auto'>
            <MdInsights size={80} />
          </div>
          <h3>Get Workout Insights</h3>
        </div>
        <div className='w-full sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center p-2'>
          <div className='w-auto h-auto'>
            <BsFillArrowUpSquareFill size={80} />
          </div>
          <h3>Up The Reps</h3>
        </div>
      </div>
    </section>
  )
}

export default Process
