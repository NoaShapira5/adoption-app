import subLogo1 from '../assets/subLogo1.png'
import subLogo2 from '../assets/subLogo2.png'
import {FaSignInAlt, FaUser, FaSignOutAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'


function Footer() {
    const footerYear = new Date().getFullYear()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth)

    const onLogout = () => {
      dispatch(logout())
      navigate('/')
    }

    const onRegister = () => {
      navigate('/register')
    }

  return (
    <footer className='lower'>
      <div className="footer">
        {user ? (
                  <>
                      <ul className='buttons'>
                          <li> 
                            <button onClick={onLogout} className='btn'>
                                התנתקות&nbsp;
                                <FaSignOutAlt />
                            </button>
                          </li>
                          {user.isAdmin && (
                          <li>
                              <button onClick={onRegister} className='btn'>
                                  רישום משתמש חדש&nbsp;<FaUser /> 
                              </button>
                          </li>                            
                          )}
                      </ul>
                  </>

              ) : (
                  <>
                      <ul>      
                          <li>
                              <Link to='/login'>
                                  ניהול&nbsp;<FaSignInAlt /> 
                              </Link>
                          </li>
                      </ul>
                  </>
              )}
        <p>Copyright &copy; {footerYear} All rights reserved</p>
        <img src={subLogo2} alt="משרד החקלאות" className='subLogo'/>
        <img src={subLogo1} alt="שירותים וטרינרים גוש דן" className='subLogo'/>
      </div>
    </footer>
  )
}

export default Footer
