/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRef, useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserCredentials, User } from '../../features/userSlice'
import { useLoginMutation } from '../../features/userApiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
const LoginForm = () => {
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLParagraphElement>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errMsg, setErrMsg] = useState<string>('')
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const userData: User = await login({ email: email, password: password }).unwrap()
      dispatch(setUserCredentials({ ...userData }))
      navigate('/dashboard')
    } catch (err: FetchBaseQueryError | unknown) {
      if (!(err as FetchBaseQueryError)?.status) {
        setErrMsg('No Server Response')
      } else if ((err as FetchBaseQueryError).status === 400) {
        setErrMsg('Missing Username or Password')
      } else if ((err as FetchBaseQueryError).status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
    }
    if (errRef.current) {
      errRef.current.focus()
    }
  }

  const content = isLoading ? (
    <section className='h-full w-full flex flex-col flex-center'>
      <h1 className='self-center'>Welcome Back!</h1>
      <div className='flex flex-col justify-center items-center'>
        <h3>You are currently logging in...</h3>
      </div>
    </section>
  ) : (
    <section className='flex flex-col justify-center items-center h-full w-full'>
      <div className='bg-brand text-white flex flex-col justify-center items-center p-2 m-2 rounded-xl h-fit w-fit'>
        <p
          ref={errRef}
          className={errMsg ? 'bg-brand-light text-danger font-bold' : 'absolute left-[100%]'}
        >
          {errMsg}
        </p>
        <h1 className='text-white'>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            ref={emailRef}
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className='self-center'>Sign In</button>
        </form>
      </div>
    </section>
  )
  return content
}

export default LoginForm
