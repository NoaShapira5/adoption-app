import subLogo1 from '../assets/subLogo1.png'
import subLogo2 from '../assets/subLogo2.png'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import mainLogo2 from '../assets/mainLogo2.png'


function Footer() {
    const footerYear = new Date().getFullYear()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth)

    const onLogout = () => {
      dispatch(logout())
      navigate('/')
    }

  return (
    <footer className='lower'>
      <div className="footer">
        <div className="logo-footer">
          <img src={mainLogo2} alt='משרד החקלאות' className='main-logo2'/>
        </div> 
        <p>Copyright &copy; {footerYear} All rights reserved</p>
        <div className='bottom'>
          <img src={subLogo2} alt="משרד החקלאות" className='subLogo'/>
          <img src={subLogo1} alt="שירותים וטרינרים גוש דן" className='subLogo'/>
          {user ? (
                    <>
                        <ul>
                            <li> 
                              <button onClick={onLogout} className='btn'>
                                  התנתקות&nbsp;
                                  <FaSignOutAlt />
                              </button>
                            </li>
                        </ul>
                    </>

                ) : (
                    <>
                        <ul>      
                            <li>
                                <Link to='/login' className='btn'>
                                    ניהול&nbsp;<FaSignInAlt /> 
                                </Link>
                            </li>
                        </ul>
                    </>
                )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
