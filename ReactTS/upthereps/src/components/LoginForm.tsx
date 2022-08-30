import axios, { AxiosError } from 'axios'
import { useRef, useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auths } from '../api/Api'
import { GlobalStateInterface, useGlobalState } from '../context/GlobalStateProvider'
const LoginForm = () => {
  const { setState } = useGlobalState()
  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLParagraphElement>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const LoginRequest = {
    email: email,
    password: password,
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await Auths.login(LoginRequest)
      .then((response: GlobalStateInterface) => {
        const jwt: string = response?.jwt
        const role: string = response?.role
        const fName: string = response?.fName
        const userEmail: string = response?.userEmail
        const userId: number = response?.userId
        setState({ jwt, role, fName, userEmail, userId })
        setEmail('')
        setPassword('')
        navigate('/dashboard')
      })
      .catch((err: AxiosError) => {
        if (axios.isAxiosError(err)) {
          if (!err?.response) {
            setErrMsg('No Server Response')
          } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password')
          } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized')
          }
        } else {
          setErrMsg('Login Failed')
        }
        if (errRef.current) errRef.current.focus()
      })
  }

  return (
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
}

export default LoginForm
