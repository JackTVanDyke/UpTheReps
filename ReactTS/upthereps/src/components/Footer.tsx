import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { RiDiscordFill } from 'react-icons/ri'
const Footer = () => {
  return (
    <footer className='mt-auto relative bottom-0 left-0 w-full min-h-[100px] bg-brand text-white flex flex-col justify-center items-center'>
      <div className='overflow-hidden flex flex-col md:flex-row items-center justify-center text-center'>
        <h1 className='text-white'>UpTheReps</h1>
      </div>
      <div className='flex flex-col text-center items-center justify-center w-full md:w-1/4'>
        <div className='flex flex-row items-center justify-center'>
          <div className='mx-2'>
            <a href='https://github.com/JackTVanDyke'>
              <AiFillGithub
                size={30}
                className='cursor-pointer text-white hover:text-brand-light'
              />
            </a>
          </div>
          <div className='mx-2'>
            <a href='https://www.linkedin.com/in/jack-vandyke/'>
              <AiFillLinkedin
                size={30}
                className='cursor-pointer text-white hover:text-brand-light'
              />
            </a>
          </div>
          <div className='mx-2'>
            <a href='https://discordapp.com/users/JackVanDyke#1315'>
              <RiDiscordFill
                size={30}
                className='cursor-pointer text-white hover:text-brand-light'
              />
            </a>
          </div>
        </div>
      </div>
      <div className='bg-brand text-white pt-2 mt-2 text-xsm text-center'>©2022 UpTheReps.</div>
    </footer>
  )
}

export default Footer
