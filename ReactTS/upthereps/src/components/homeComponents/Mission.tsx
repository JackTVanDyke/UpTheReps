import Gym from '../../assets/Gym.jpg'
const Mission = () => {
  return (
    <section className='flex flex-col text-center items-center justify-center min-w-full min-h-[300px]'>
      <h1>UpTheReps Mission</h1>
      <div className='flex flex-col md:flex-row items-center justify-center mt-8 lg:mx-24'>
        <div className='lg:min-w-1/2 w-[60%] flex flex-col items-center justify-center order-last md:order-first mx-8'>
          <img src={Gym} alt='Gym' className='max-w-1/2 max-h-3/4 self-center rounded-[36px]' />
        </div>
        <div className='w-full h-full lg:min-w-1/2 flex flex-col justify-center items-center text-center'>
          <p className='w-3/4 lg:w-1/2'>
            Many new lifters are not training correctly for their goals. UpTheReps removes all the
            boring stuff from the gym process and leaves you with the best part - putting in the
            work.
          </p>
          <p className='w-3/4 lg:w-1/2'>
            UpTheReps is for beginner/intermediate lifters who struggle with programming and
            consistency, helping them achieve their goals with less effort. If you are looking to
            get to work and chase your best self, join us today.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Mission
