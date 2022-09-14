import { useAppDispatch } from '../../app/hooks'
import { logout } from '../../features/userSlice'

const LogoutButton = (props: { togglePopup: () => void }) => {
  const dispatch = useAppDispatch()
  return (
    <section className='absolute h-full w-full'>
      <div className='fixed inset-0 m-auto w-3/4 h-auto max-h-[70vh] bg-white text-brand rounded-lg p-4 border border-brand overflow-auto'>
        <div className='flex flex-col justify-center items-center w-full h-full text-center'>
          <h1 className='py-8 my-8 self-center text-center'>
            Are you sure you&lsquo;d like to logout?
          </h1>
          <div className='flex flex-row items-center justify-evenly'>
            <button onClick={() => dispatch(logout)}>Yes</button>
            <button onClick={props.togglePopup}>No</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoutButton
