import { useState, useEffect } from "react"
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password: '',
    })

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
      if(isError) {
          toast.error(message)
      }

      // Redirect when logged in
      if(isSuccess || user) {
          navigate('/')
      }
      dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])


    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
          email,
          password
        }

        dispatch(login(userData))


    }

    if(isLoading) {
      return <Spinner />
    }

  return (
    <>
      <section className="heading">
        <h1>
            כניסה
        </h1>
        <p>כניסה של משתמש קיים</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" 
                id='email' value={email} onChange={onChange}
                placeholder='הכנס כתובת דואר אלקטרוני' name='email'
                dir="rtl" required/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" 
                id='password' value={password} onChange={onChange}
                placeholder='הכנס סיסמה' name='password'
                dir="rtl" required/>
            </div>
            <div className="form-group">
                <button className="btn btn-block">כניסה</button>
            </div>

        </form>
      </section>
    </>
  )
}

export default Login
