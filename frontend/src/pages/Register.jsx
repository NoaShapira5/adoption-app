import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading, isSuccess, message, isError} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        // Success message after creating new user
        if(isSuccess) {
            toast.success('New User Created Successfully')
        }
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('הסיסמאות לא תואמות')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }
    if(isLoading) {
        <Spinner />
    }

  return (
    <>
      <section className="heading">
        <h1>
            הרשמה
        </h1>
        <p>יצירת משתמש חדש</p>
      </section>
      <section>
        <form onSubmit={onSubmit} className='form'>
            <div className="form-group">
                <input type="text" className="form-control"
                id="name" value={name} onChange={onChange}
                placeholder='הכנס שם מלא' name='name'
                dir="rtl" required/>
            </div>
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
                <input type="password" className="form-control" 
                id='password2' value={password2} onChange={onChange} 
                placeholder='אימות סיסמה' name='password2'
                dir="rtl" required/>
            </div>
            <div className="form-group">
                <button className="btn btn-block">הירשם</button>
            </div>

        </form>
      </section>
    </>
  )
}

export default Register
