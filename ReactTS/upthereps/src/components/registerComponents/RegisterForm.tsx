import axios, { AxiosError } from 'axios'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users } from '../../api/Api'

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,30}))$/
const PWD_REGEX = /(?=.+[a-z])(?=.+[A-Z])(?=.+\d)([a-zA-Z\d]|[`~!@#$%^&*()_+-='";:,<.>\/?]){8,32}/
const NAME_REGEX = /^[ a-zA-Z\-\’]+$/
const RegisterForm = () => {
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLParagraphElement>(null)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [fName, setFName] = useState('')
  const [validFName, setValidFName] = useState(false)
  const [fNameFocus, setFNameFocus] = useState(false)
  const [lName, setLName] = useState('')
  const [validLName, setValidLName] = useState(false)
  const [LNameFocus, setLNameFocus] = useState(false)
  const [password, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [passwordFocus, setPwdFocus] = useState(false)
  const [passwordConfirm, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  useEffect(() => {
    if (emailRef.current) emailRef.current.focus()
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = NAME_REGEX.test(fName)
    setValidFName(result)
  }, [fName])

  useEffect(() => {
    const result = NAME_REGEX.test(lName)
    setValidLName(result)
  }, [lName])

  useEffect(() => {
    const result = PWD_REGEX.test(password)
    setValidPwd(result)
    if (password.length !== 0) {
      const match = password === passwordConfirm
      setValidMatch(match)
    }
  }, [password, passwordConfirm])

  useEffect(() => {
    setErrMsg('')
  }, [email, password, passwordConfirm])

  const CreateNewUserRequest = {
    email: email,
    password: passwordConfirm,
    firstName: fName,
    lastName: lName,
  }

  let content

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v1 = EMAIL_REGEX.test(email)
    const v2 = PWD_REGEX.test(password)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }
    await Users.registerUser(CreateNewUserRequest)
      .then((response) => {
        navigate('/login')
        setEmail('')
        setFName('')
        setLName('')
        setPwd('')
        setMatchPwd('')
        content = (
          <section className='flex flex-col justify-center items-center h-auto w-full'>
            <div className='bg-brand text-white flex flex-col justify-center items-center p-2 m-2 rounded-xl w-fit'>
              <h1>Welcome!</h1>
              <h3>Check your email to verify your account and get started.</h3>
            </div>
          </section>
        )
      })
      .catch((err: AxiosError) => {
        if (axios.isAxiosError(err)) {
          if (err?.response?.status === 409) {
            setErrMsg('Username Taken')
          } else {
            setErrMsg('Registration Failed')
            console.log(err.response?.data)
            return err.response?.data
          }
        } else {
          setErrMsg('No Server Response')
        }
        if (errRef.current) errRef.current.focus()
      })
  }

  content = (
    <section className='flex flex-col justify-center items-center h-auto w-full'>
      <div className='bg-brand text-white flex flex-col justify-center items-center p-2 m-2 rounded-xl w-fit'>
        <p ref={errRef} className={errMsg ? 'text-danger font-bold' : 'absolute left-[100%]'}>
          {errMsg}
        </p>
        <h1 className='text-white'>Join Us</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>
            Email:
            {validEmail ? (
              <FaCheck className='text-success m-2' />
            ) : (
              <FaTimes className='text-danger m-2' />
            )}
          </label>
          <input
            type='text'
            id='email'
            ref={emailRef}
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />

          <label htmlFor='fName'>
            First Name:
            {validFName ? (
              <FaCheck className='text-success m-2' />
            ) : (
              <FaTimes className='text-danger m-2' />
            )}
          </label>
          <input
            type='text'
            id='fName'
            autoComplete='off'
            onChange={(e) => setFName(e.target.value)}
            value={fName}
            required
            onFocus={() => setFNameFocus(true)}
            onBlur={() => setFNameFocus(false)}
          />

          <label htmlFor='lName'>
            Last Name:
            {validLName ? (
              <FaCheck className='text-success m-2' />
            ) : (
              <FaTimes className='text-danger m-2' />
            )}
          </label>
          <input
            type='text'
            id='lName'
            autoComplete='off'
            onChange={(e) => setLName(e.target.value)}
            value={lName}
            required
            onFocus={() => setLNameFocus(true)}
            onBlur={() => setLNameFocus(false)}
          />

          <label htmlFor='password'>
            Password:
            {validPwd ? (
              <FaCheck className='text-success m-2' />
            ) : (
              <FaTimes className='text-danger m-2' />
            )}
          </label>
          <input
            type='password'
            id='password'
            autoComplete='off'
            onChange={(e) => setPwd(e.target.value)}
            value={password}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            className={
              validPwd || !password
                ? 'hidden'
                : 'text-danger m-2 text-xs w-fit md:w-full self-center'
            }
          >
            Must contain at least 8 characters and include a lowercase and uppercase letter, and one
            number.
          </p>

          <label htmlFor='confirm_password'>
            Confirm Password:
            {validMatch ? (
              <FaCheck className='text-success m-2' />
            ) : (
              <FaTimes className='text-danger m-2' />
            )}
          </label>
          <input
            type='password'
            id='confirm_password'
            onChange={(e) => setMatchPwd(e.target.value)}
            value={passwordConfirm}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <button
            disabled={
              !validEmail || !validFName || !validLName || !validPwd || !validMatch ? true : false
            }
            className='self-center'
          >
            Join UpTheReps
          </button>
        </form>
      </div>
    </section>
  )
  return <div>{content}</div>
}

export default RegisterForm
